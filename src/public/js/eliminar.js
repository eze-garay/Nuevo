
const socket = io ();


<script>
  function eliminarProducto(id) {
    // Enviar un mensaje de eliminación al servidor de sockets
    socket.emit('eliminar_producto', id);
  }
</script>