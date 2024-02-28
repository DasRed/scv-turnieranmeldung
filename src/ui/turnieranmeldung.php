<?php
$config = array(
    'db' => array(
        'dsn'      => 'mysql:dbname=scvierkirchen_registration;host=192.168.178.2',
        'user'     => 'root',
        'password' => 'root',
        'options'  => array(),
    ),
);

$sql = array(
    'schema' => array(
        'create schema scvierkirchen_registration',
        '
            create table registration(
                id          int auto_increment,
                created_at  datetime default current_timestamp    not null,
                age         ENUM (\'U7\', \'U8\', \'U9\', \'U10\', \'U11\') not null,
                association varchar(1024)                         not null,
                team        varchar(10124)                        not null,
                coach       varchar(1024)                         not null,
                email       varchar(1024)                         not null,
                phone       varchar(1024)                         not null,
                constraint registration_id_pk primary key (id)
            )
        ',
    ),
    'insert' => '
        INSERT INTO registration 
        SET age = :age,
            association = :association,
            team = :team,
            coach = :coach,
            email = :email,
            phone = :phone,
    ',
);

$saved = false;
$error = false;
$errorMessage = '';

if (array_key_exists('action', $_POST) && $_POST['action'] === 'save') {
    $db = new PDO($config['db']['dsn'], $config['db']['user'], $config['db']['password'], $config['db']['options']);
    try {
        $saved = $db->prepare($sql['insert'])->execute([
            'age'         => array_key_exists('age', $_POST) ? $_POST['age'] : null,
            'association' => array_key_exists('association', $_POST) ? $_POST['association'] : null,
            'team'        => array_key_exists('team', $_POST) ? $_POST['team'] : null,
            'coach'       => array_key_exists('coach', $_POST) ? $_POST['coach'] : null,
            'email'       => array_key_exists('email', $_POST) ? $_POST['email'] : null,
            'phone'       => array_key_exists('phone', $_POST) ? $_POST['phone'] : null,
        ]);
    }
    catch (Exception $exception) {
       $error = true;
       $errorMessage = 'Leider konnte ihre Anfrage nicht gespeichert werden. Bitte versuchen Sie es zu einem späteren Zeitpunkt.';
    }
}

?>
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SC Vierkirchen Gruber CUP - Turnieranmeldung</title>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .error {
            font-color: #FF0000;
            font-weight: bold;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input, select {
            width: 100%;
            padding: 8px;
            margin-bottom: 10px;
            box-sizing: border-box;
        }

        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>SC Vierkirchen Gruber CUP - Turnieranmeldung</h2>
    <?php if ($error === false) { ?>
        <div class="error"><?php echo $errorMessage ?></div>
    <?php } ?>
    <?php if ($saved === false) { ?>
        <form action="." method="post">
            <label for="age">Alterklasse:</label>
            <select name="age" required>
                <option value='U7'>U7 Jg. 2017 - 14.07.2024 - 10:00</option>
                <option value='U8'>U8 Jg. 2016 - 13.07.2024 - 12:30</option>
                <option value='U9'>U9 Jg. 2015 - 13.07.2024 - 09:30</option>
                <option value='U10'>U10 Jg. 2014 - 13.07.2024 - 14:30</option>
                <option value='U11'>U11 Jg. 2013 - 14.07.2024 - 12:00</option>
            </select>

            <label for="association">Vereinsname:</label>
            <input type="text" name="association" required>

            <label for="team">Mannschaft:</label>
            <input type="text" name="team" required>

            <label for="coach">Name des Trainer:</label>
            <input type="text" name="coach" required>

            <label for="email">Email des Trainer:</label>
            <input type="email" name="email" required>

            <label for="mobile">Telefon des Trainer:</label>
            <input type="tel" name="mobile" required>

            <input type="hidden" name="action" value="save"/>
            <button type="submit">Anmelden</button>
        </form>
    <?php } else { ?>
        Danke für ihre Anmeldung. Sobald die Anmeldung geschlossen wird, melden wir uns bei ihnen.
    <?php } ?>
</div>

</body>
</html>

