<?php
  @session_start();
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Distribuidos 2018 - Trabajo Practico Web Services">
    <meta name="author" content="Fiorentino - Violi">

    <title>Distribuidos 2018</title>

    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/Distribuidos.css">
    
</head>  

<!-- Barra de Navegacion -->
<nav class="navbar navbar-expand-xl bg-dark navbar-dark">
  <ul class="navbar-nav">
    <li class="nav-item active"><a href="../../WebClima/view/Bienvenido.html">Bienvenido</a></li>
    <li class="nav-item"><a href="../../WebClima/view/BuscarPronostico.html">   BuscarPronostico</a></li>
    <li class="nav-item"><a href="../../WebClima/view/Perfil.php">  Perfil</a></li>
    <li class="nav-item"><a href="../../WebClima/view/CerrarSesion.php">  CerrarSesi&oacute;n</a></li>
  </ul>
</nav>
<!-- Fin Barra de Navegacion -->

<body>

      <?php if(isset( $_SESSION['modUser'] )) { 
        echo '<div class="container">
                <div class="col-xs-12">
                    <div class="alert-spot alert-spot-success">
                        <div class="alert-link-text">
                            <h4>' . $_SESSION['modUser'] . '</h4>
                        </div>
                    </div>
                </div>
              </div>';
        unset( $_SESSION['modUser'] ); }     ?>

<section>
  <div class="container">
    <div class="panel-group">
      <div class="panel panel-primary">
          <div class="panel-body">

            <h4 class="h4">Perfil de Usuario</h4> <br>

            <div class="row">
              <div class="tab-content col-sm-4">
              
                <form action="http://localhost/WebClima/REST/ModUsuariosCURL.php" method="POST">

                  <input type="hidden" name="id" value="<?php echo $_SESSION['idUsuario'];?>">
              
                  <div class="form-group">
                    <label for="ciudad">Ciudad:</label>
                    <select class="form-control" name="ciudad">
                      <option value="3433955">Bs. As.</option>
                      <option value="3469058">Brasilia</option>
                      <option value="3169070">Roma</option>
                      <option value="2968815">Paris</option>
                      <option value="6147439">Sidney</option>
                    </select>
                  </div>
                  <br>
                  <button type="submit" class="btn btn-primary">Modificar Ciudad</button>
                  
                </form>

      
              </div>
            </div>  

            <div class="row">
              <div class="tab-content col-sm-4">
              
                <form action="http://localhost/WebClima/REST/DeleteUsuariosCURL.php" method="POST">
              
                  <input type="hidden" name="id" value="<?php echo $_SESSION['idUsuario'];?>">

                  <br>
                  <button type="submit" class="btn btn-primary">Eliminar Cuenta</button>
                  
                </form>

      
              </div>
            </div>  


          </div>
        </div>
      </div>
    </div>      
  </section>
    
<!-- JQuery -->
  
<script type="text/javascript" src="../assets/js/jquery.min.js"></script> 
<script type="text/javascript" src="../assets/js/bootstrap.min.js"></script>

<!-- Footer -->
  <section id="footer">
    <div class="container">
      
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
          <p>Desarrollo de Software en Sistemas Distribuidos 2018 - Universidad Nacional de Lan&uacute;s</p>
          <p class="h6">Fiorentino, Kevin / Violi, Pablo</p>
        </div>
      </div>  
      
    </div>
  </section>
<!-- ./Footer -->
  
</body>

</html>