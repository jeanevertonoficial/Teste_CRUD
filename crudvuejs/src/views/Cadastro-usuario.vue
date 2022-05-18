<template>
  <div  class="card-img-left home">
  <FormUsuario/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormUsuario from "@/components/FormUsuario";

export default {
  name: 'Cadastro-usuario',
  components: {
    FormUsuario
  }
}
</script>
