<template>
  <MessegesDeAlerts
      :estilo="estilo"
      :txt_mensagem="msg"
      :style="campo_info"
      v-show="msg"
  />
  <div class="container-md">
    <form @submit.prevent="criarCadastro($event)">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" :style="campo_info" id="nome" v-model="nome"
               placeholder="Digite seu primeiro nome">
      </div>
      <div class="form-group">
        <label for="sobrenome_nome">Sobrenome</label>
        <input type="text" class="form-control" :style="campo_info" id="sobrenome_nome" v-model="sobrenome"
               placeholder="Digite seu sobrenome">
      </div>
      <div class="form-group">
        <label for="idade">Idade</label>
        <input type="number" class="form-control" id="idade" placeholder="Insira sua idade">
      </div>
      <ButtomBase
          :btn_text="btn"/>
    </form>
  </div>
</template>

<script>

import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";

export default {
  name: "FormUsuario",
  components: {
    ButtomBase,
    MessegesDeAlerts
  },
  data() {
    return {
      btn: 'Concluir',
      campo_info: null,

      msg: null,
      estilo: null,

      nome: null,
      sobrenome: null,
      idade: null,
      sexo: null
    }
  },
  methods: {
    async criarCadastro(e) {

      if (this.nome != " " && this.sobrenome != " "){
        this.estilo = 'sucesso';
        this.campo_info = 'box-shadom: 0px 10px 15px green;'
        this.msg = `Cadastro realizado com sucesso!`
        setTimeout(() => this.msg = "", 3000)

      } else if (this.nome == "" || length.this.nome <= 3 || this.idade < 10)  {
        this.estilo = 'erro';
        this.campo_info = 'border: 2px solid red;'
        this.msg = `Erro ao cadastrar usuário!`
        setTimeout(() => this.msg = "", 3000)
      }

      console.log(this.nome)
      console.log(this.sobrenome)
      console.log(this.sexo)
      console.log(this.idade)

      e.preventDefault();

      // Mensagem pedido realizado com sucesso
      //apagando a mensagem de inserido com sucesso após 3 segundos
   //   setTimeout(() => this.msg = "", 3000)
      // limpa os campos após insersão
      this.nome = "";
      this.sobrenome = "";
      this.idade = "";
      this.sexo = "";
    }
  }
}
</script>

<style scoped>

</style>