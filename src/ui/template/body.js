export default (content) => `
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SC Vierkirchen Gruber CUP - Turnieranmeldung</title>
    <link rel="icon" type="image/vnd.microsoft.icon" href="https://www.scvierkirchen.de/tl_files/scv/favicon.ico">
    <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="https://www.scvierkirchen.de/tl_files/scv/favicon.ico">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
        body {
            background-color: #f5eab3;
            font-family: Montserrat, sans-serif;
            font-size: 16px;
            font-weight: normal;
            font-style: normal;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .error {
            color: #FF0000;
            font-weight: bold;
            margin-bottom: 10px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input, select {
            font-family: Montserrat, sans-serif;
            display: block;
            padding: 5px;
            border: 4px solid #F1B720;
            border-radius: 5px;
            color: #333;
            transition: all 0.3s ease-out;
            width: 100%;
            margin-bottom: 10px;
            box-sizing: border-box;
        }
        
        input:hover, select:hover { border-radius: 8px; }
        input:focus, select:focus { 
            outline: none;
            border-radius: 8px; 
            border-color: #EBD292;
        }

        button {
            font-family: Montserrat, sans-serif;
            margin-top: 10px;
            display: inline-block;
            padding: 8px 15px;
            background: #FCEE7C;
            border: 1px solid rgba(0,0,0,0.15);
            border-radius: 4px;
            transition: all 0.3s ease-out;
            box-shadow:
                    inset 0 1px 0 rgba(255,255,255,0.5),
                    0 2px 2px rgba(0,0,0,0.3),
                    0 0 4px 1px rgba(0,0,0,0.2);
            
            text-decoration: none;
            text-shadow: 0 1px rgba(255,255,255,0.7);
            
            width: 100%;                
        }
        
        button:hover  { background: #fff1b6; }
    </style>
</head>
<body>

<div class="container">
    <h2>SC Vierkirchen Gruber CUP - Turnieranmeldung</h2>
    ${content}
</div>

</body>
</html>
`;
