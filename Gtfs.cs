using System;
using System.IO;
using System.Text;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

class Program
{
    static void Main(string[] args)
    {
        string inputFilePath = "C:\\xampp\\htdocs\\kkzrt\\gtfs_data.json";
        string outputFilePath = "C:\\xampp\\htdocs\\kkzrt\\gtfs_data_cleaned.json";

        try
        {
            // A fájl feldolgozása és az új fájl létrehozása
            ProcessAndCreateNewFile(inputFilePath, outputFilePath);
            Console.WriteLine("Új fájl sikeresen létrehozva: " + outputFilePath);
            Console.WriteLine("Nyomj meg egy billentyűt a kilépéshez...");
            Console.ReadKey();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Hiba történt a feldolgozás során: {ex.Message}");
            Console.WriteLine("Nyomj meg egy billentyűt a kilépéshez...");
            Console.ReadKey();
        }
    }

    static void ProcessAndCreateNewFile(string inputPath, string outputPath)
    {
        // Fájl beolvasása és NaN értékek cseréje
        StringBuilder fileContent = new StringBuilder();
        int lineCount = 0;
        
        using (StreamReader reader = new StreamReader(inputPath))
        {
            string line;
            while ((line = reader.ReadLine()) != null)
            {
                lineCount++;
                // NaN értékek cseréje null-ra
                string cleanedLine = line
                    .Replace(": NaN", ": null")
                    .Replace(":NaN", ": null")
                    .Replace("NaN,", "null,")
                    .Replace("NaN}", "null}")
                    .Replace("NaN\n", "null\n");
                
                fileContent.AppendLine(cleanedLine);
                
                // Státusz kiírása minden 100000. sornál
                if (lineCount % 100000 == 0)
                {
                    Console.WriteLine($"Feldolgozott sorok: {lineCount}");
                }
            }
        }

        Console.WriteLine("Fájl beolvasva, JSON feldolgozás kezdődik...");

        // JSON feldolgozás és formázott kiírás
        try
        {
            // Deserializáljuk a JSON-t objektummá
            var jsonObject = JsonConvert.DeserializeObject(fileContent.ToString());
            
            // Serialization beállítások a szép formázáshoz
            var settings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented,
                NullValueHandling = NullValueHandling.Include
            };

            // Kiírjuk az új, formázott JSON-t
            string formattedJson = JsonConvert.SerializeObject(jsonObject, settings);
            File.WriteAllText(outputPath, formattedJson);

            Console.WriteLine("JSON feldolgozás és kiírás sikeres!");
            Console.WriteLine($"Összes feldolgozott sor: {lineCount}");
            
            // Ellenőrzés: az első néhány sor kiírása
            using (StreamReader reader = new StreamReader(outputPath))
            {
                Console.WriteLine("\nAz új fájl első néhány sora ellenőrzésképpen:");
                for (int i = 0; i < 5 && !reader.EndOfStream; i++)
                {
                    Console.WriteLine(reader.ReadLine());
                }
            }
        }
        catch (JsonReaderException ex)
        {
            int errorLineNumber = ex.LineNumber;
            int errorPosition = ex.LinePosition;
            Console.WriteLine($"JSON hiba a(z) {errorLineNumber}. sor {errorPosition}. pozíciójában:");
            Console.WriteLine(ex.Message);
            
            // Próbáljuk megmutatni a problémás részt
            var lines = fileContent.ToString().Split('\n');
            if (errorLineNumber <= lines.Length)
            {
                Console.WriteLine("\nProblémás rész környéke:");
                for (int i = Math.Max(0, errorLineNumber - 2); i < Math.Min(lines.Length, errorLineNumber + 2); i++)
                {
                    Console.WriteLine($"{i + 1}: {lines[i]}");
                }
            }
            throw;
        }
    }
}
