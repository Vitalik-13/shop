<?php



// Отримуємо дані з форми
$id = $_POST['id'] ?? 'ID не вказано';
$name = $_POST['name'] ?? 'Ім\'я не вказано';
$phone = $_POST['phone'] ?? 'Телефон не вказано';
$article = $_POST['article'] ?? 'Стаття не вказана';
$price = $_POST['price'] ?? 'Ціна не вказана';

// Відображаємо повідомлення
?>
<!DOCTYPE html>
<html lang="uk">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="style.css">
    <title>Дякуємо за замовлення</title>
</head>
<body>
    <div class="container php">
    <h1 class="php-title">Дякуємо за ваше замовлення!</h1>
    <p class="php-paragraph">Менеджер зв'яжеться з вами найближчим часом</p>
    <a href="./index.html" class="link-php">Замовити ще</a>

<!-- це можна видалити ================================================== -->
    <p><strong>Ім'я:</strong> <?php echo htmlspecialchars($name); ?></p>
    <p><strong>Телефон:</strong> <?php echo htmlspecialchars($phone); ?></p>
    <p><strong>Стаття:</strong> <?php echo htmlspecialchars($article); ?></p>
    <p><strong>Ціна:</strong> <?php echo htmlspecialchars($price); ?></p>
    <p><strong>id товару</strong> <?php echo htmlspecialchars($id); ?></p>
<!-- це можна видалити ================================================== -->

    </div>
</body>
</html>
