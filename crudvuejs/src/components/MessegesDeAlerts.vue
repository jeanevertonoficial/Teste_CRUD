<template>
  <div class="alert alert-success" role="alert" :class="estiloDaMensagem">
       {{ txt_mensagem }}
  </div>
</template>

<script>
export default {
  name: "MessegesDeAlerts",
  props: {
    txt_mensagem:String,
    estilo: {
      default: 'sucesso'

    },
    computed: {
      estiloDaMensagem: function () {
        let estiloDaMensagem;
        if (this.estilo == 'sucesso' || !this.estilo) {
          estiloDaMensagem = 'alert-success';
        } else if (this.estilo == 'erro') {
          estiloDaMensagem = 'alert-danger';
        }
        return estiloDaMensagem;
      }
    }
  }
}
</script>