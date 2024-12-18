<?php
session_start();
require_once 'config.php';

// Hibák megjelenítése
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['register'])) {
    $username = $_POST['registerUsername'];
    $email = $_POST['registerEmail'];
    $password = $_POST['registerPassword'];
    $password_confirm = $_POST['registerPasswordConfirm'];
    
    $errors = [];

    // Validációk
    if (empty($username) || empty($email) || empty($password) || empty($password_confirm)) {
        $errors[] = "Minden mező kitöltése kötelező";
    }

    if ($password !== $password_confirm) {
        $errors[] = "A jelszavak nem egyeznek";
    }

    if (empty($errors)) {
        try {
            $sql = "INSERT INTO users (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $conn->prepare($sql);
            
            $params = [
                ':username' => $username,
                ':email' => $email,
                ':password' => $password
            ];
            
            $result = $stmt->execute($params);
            
            if ($result) {
                $_SESSION['success'] = "Sikeres regisztráció!";
                header("Location: login.php");
                exit();
            } else {
                $errors[] = "Hiba történt a regisztráció során";
            }
            
        } catch (PDOException $e) {
            $errors[] = "Adatbázis hiba történt: " . $e->getMessage();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
      
        
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to TOP, #303639,#b30000,#FFFFFF);
            background-size: cover;
            background-repeat: no-repeat;
            color: #000;
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .register-container {
            background: linear-gradient(to right, #303639,#b30000);
            max-width: 400px;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 30px 90px rgba(0,0,0,1);
        }
        
        .icon-container {
            
            text-align: center;
            margin-bottom: 2rem;
            animation: fadeIn 1s ease-in;
        }
        
        form{
            text-align: center;
            color: white;
            font-size: 120%;
        }
        .form-control {
            padding: 0.8rem;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        .form-control:focus {
            border-color: var(--volan-blue);
            box-shadow: 0 0 0 0.2rem rgba(0,75,147,0.15);
        }
        
        .form-label {
            color: var(--volan-blue);
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .btn-primary {
            background: linear-gradient(to right, #000000, #FF0000);
            border: none;
            padding: 0.8rem;
            border-radius: 8px;
            font-weight: 500;
            transition: all 0.3s;
        }
        
        .btn-primary:hover {
            background: linear-gradient(to right, #000000, #FF0000);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,75,147,0.2);
        }
        
        .login-link {
            color: white;
            text-decoration: none;
            transition: all 0.3s;
            font-weight: bold;
        }
        
        .login-link:hover {
            color: #0066cc;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .alert {
            margin-bottom: 1rem;
            border-radius: 8px;
            padding: 1rem;
        }

        .alert-danger {
            background-color: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }

        .alert-success {
            background-color: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="register-container">
            <div class="icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" style="max-width: 200px;" viewBox="0 0 576 512"><!--!Font Awesome Free 6.7.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M288 0C422.4 0 512 35.2 512 80l0 16 0 32c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32l0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32-192 0 0 32c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32c0 0 0 0 0 0l0-32s0 0 0 0l0-16C64 35.2 153.6 0 288 0zM128 160l0 96c0 17.7 14.3 32 32 32l112 0 0-160-112 0c-17.7 0-32 14.3-32 32zM304 288l112 0c17.7 0 32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-112 0 0 160zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16L208 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16z"/></svg>
            </div>

            <?php
            if (!empty($errors)) {
                foreach ($errors as $error) {
                    echo '<div class="alert alert-danger">' . $error . '</div>';
                }
            }
            ?>

            <form method="POST" action="register.php">
                <div class="mb-3">
                    <div><h1 style="color:white; font-weight: bold">Regisztráció</h1></div>
                    <label for="registerUsername" class="form-label">Felhasználónév:</label>
                    <input style="font-weight: bold" type="text" class="form-control" id="registerUsername" name="registerUsername" required>
                </div>
                
                <div class="mb-3">
                    <label for="registerEmail" class="form-label">Email:</label>
                    <input style="font-weight: bold" type="email" class="form-control" id="registerEmail" name="registerEmail" required>
                </div>
                
                <div class="mb-3">
                    <label for="registerPassword" class="form-label">Jelszó:</label>
                    <input type="password" class="form-control" id="registerPassword" name="registerPassword" required>
                </div>
                
                <div class="mb-3">
                    <label for="registerPasswordConfirm" class="form-label">Jelszó megerősítése:</label>
                    <input type="password" class="form-control" id="registerPasswordConfirm" name="registerPasswordConfirm" required>
                </div>
                
                <button type="submit" name="register" class="btn btn-primary w-100">Regisztráció</button>
            </form>

            <div class="text-center mt-4">
            <p style="color:white;" class="mb-0"><u>Már van fiókod?</u> 
                    <a href="login.php" class="login-link">
                        <i class="fas fa-sign-in-alt me-1"></i>Bejelentkezés
                    </a>
                </p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>