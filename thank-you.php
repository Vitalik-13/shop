<?php
// Отримуємо дані з форми
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
    <title>Дякуємо за замовлення</title>
</head>
<body>
    <h1>Дякуємо за ваше замовлення!</h1>
    <p><strong>Ім'я:</strong> <?php echo htmlspecialchars($name); ?></p>
    <p><strong>Телефон:</strong> <?php echo htmlspecialchars($phone); ?></p>
    <p><strong>Стаття:</strong> <?php echo htmlspecialchars($article); ?></p>
    <p><strong>Ціна:</strong> <?php echo htmlspecialchars($price); ?></p>
</body>
</html>
