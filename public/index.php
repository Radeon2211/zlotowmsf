<?php
  $TEMPLATE_PATH = parse_url(get_template_directory_uri(), PHP_URL_PATH);
?>
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#DCDCDC" />
    <meta
      name="description"
      content="Parafia pw. Wniebowzięcia Najświętszej Maryi Panny w Złotowie"
    />
    <meta name="keywords" content="Złotów, parafia, MSF, WNMP, pw. Wniebowzięcia NMP, MSF Złotów, parafia MSF Złotów, misjonarze, misjonarze MSF, Misjonarze Świętej Rodziny, religia" />
    <link rel="apple-touch-icon" href="<?php echo $TEMPLATE_PATH; ?>/logo192.png" />
    <link rel="manifest" href="<?php echo $TEMPLATE_PATH; ?>/manifest.json" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@700&family=Roboto:wght@400;700&family=Ubuntu:wght@500&display=swap" rel="stylesheet">
    <title>Parafia Wniebowzięcia NMP w Złotowie</title>
    <?php wp_head() ?>
  </head>
  <body>
    <noscript>
      Musisz włączyć obsługę JavaScript w przeglądarce, aby strona działała prawidłowo
    </noscript>
    <div id="root"></div>
    <?php wp_footer(); ?>
  </body>
</html>
