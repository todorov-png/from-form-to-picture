

<?php
  $host = 'localhost'; // адрес сервера 127.0.0.1:3306
  $database = 'library'; // имя базы данных
  $user = 'root'; // имя пользователя
  $password = 'root'; // пароль
  
  // подключаемся к серверу
  $link = mysqli_connect($host, $user, $password, $database) 
      or die("Ошибка " . mysqli_error($link));

  $_POST = json_decode(file_get_contents('php://input'), true);

  // выполняем операции с базой данных
  if (isset($_POST)) {
 
    //Получаем переменные
    $code = $_POST['code'];
    $customer = $_POST['customer'];
    $general = $_POST['general'];
    $location = $_POST['location'];
    $name = $_POST['name'];
    $number = $_POST['number'];
    $time = $_POST['time'];
    $type = $_POST['type'];
    $email = $_POST['email'];
    
    //Делаем запрос к бд
    $query = "INSERT INTO resolution (code, customer, general, location, name, number, time, type, email) VALUES ('$code', '$customer', '$general', '$location', '$name', '$number', '$time', '$type', '$email')";
    $result = mysqli_query($link, $query);

    // переводим в JSON и отправляем ответ
    echo json_encode($result, JSON_UNESCAPED_UNICODE); 
  }    
    
  // закрываем подключение
  mysqli_close($link);
?>