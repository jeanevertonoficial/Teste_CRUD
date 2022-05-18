<template>
  <MessegesDeAlerts
      :txt_mensagem="msg"
      :class="estiloDaMensagem"
      v-show="msg"
      :estilo="estilo"
  />
  <div class="container-md">
    <TituloPagina :titulo="titulo"/>
    <form class="w-75 m-auto" @submit.prevent="criarCadastro($event)">
      <div class="form-group">
        <label for="nome">Nome completo</label>
        <input
            type="text"
            class="form-control"
            :style="campo_info"
            id="nome"
            v-model="nome"
            :placeholder="campo_obg_nome"
        >
      </div>
      <div class="form-group">
        <label for="idade">Idade</label>
        <input
            type="number"
            class="form-control"
            :style="campo_info"
            v-model="idade"
            id="idade"
            placeholder="Insira sua idade"
        >
      </div>
      <div class="form-group">
        <label for="dt_nasc">Data de Nascimento</label>
        <input
            type="date"
            class="form-control"
            :style="campo_info"
            v-model="data_nasc"
            id="dt_nasc"
        >
      </div>
      <label>Escolha o sexo</label>
      <div>
        <div class="form-check form-check-inline">
          <input
              class="form-check-input"
              type="radio"
              name="sexo"
              v-model="sexo"
              id="exampleRadios1"
              value="masculino"
          >
          <label class="form-check-label" for="exampleRadios1">
            Masculino
          </label>
        </div>
        <div class="form-check form-check-inline">
          <input
              class="form-check-input"
              type="radio"
              name="sexo"
              v-model="sexo"
              id="exampleRadios2"
              value="feminino"
          >
          <label class="form-check-label" for="exampleRadios2">
            Feminino
          </label>
        </div>
      </div>
      <ButtomBase
          :btn_text="btn"/>
    </form>
  </div>
</template>

<script>

import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";
import TituloPagina from "@/components/shared/TituloPagina";

export default {
  name: "FormUsuario",
  components: {
    ButtomBase,
    MessegesDeAlerts,
    TituloPagina
  },
  data() {
    return {
      // configurações padrões dinâmica por pagina!
      btn: 'Concluir',
      titulo: 'FORMULARIO DE CADASTRO',
      campo_info: null,
      campo_obg_nome: 'Digite seu nome completo',
      msg: null,
      estilo: null,

      nome: null,
      idade: null,
      sexo: null,
      data_nasc: null
    }
  },
  methods: {

    async criarCadastro(e) {

      e.preventDefault();

      const data = {
        nome: this.nome,
        sexo: this.sexo,
        idade: this.idade,
        data_nasc: this.data_nasc
      }

      const dataJson = JSON.stringify(data);


      // validação basica, para ver o comportamento das inserções de novos cadastros
      if (this.nome != null) {

        const req = await fetch('http://localhost:3000/Cadastrados', {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: dataJson
        })

        const rest = await req.json();

        this.estilo = 'sucesso';
        this.campo_info = 'box-shadom: 0px 0px 5px green;'
        this.msg = `Cadastro de N°${rest.id}, realizado com sucesso!`

        setTimeout(() => this.msg = "", 3000)
        setTimeout(() => this.campo_info = "box-shadom: initial", 2000)

      } else if (this.nome == null) {

        this.estilo = 'erro';
        this.campo_info = 'box-shadow: 0px 0px 5px red'
        this.msg = `Erro ao cadastrar usuário!`
        this.campo_obg_nome = 'inválido campo precisa ter no minimo 3 caracter!'

        setTimeout(() => this.msg = "", 3000)
        setTimeout(() => this.campo_info = "box-shadom: initial", 2000)
        setTimeout(() => this.campo_obg_nome = 'Digite seu primeiro nome', 2500)
      }

      // zerando o formulario após a inserção
      this.nome = "";
      this.idade = "";
      this.data_nasc = "";
      this.sexo = "";

    },

    async getUsuarios() {

      const req = await fetch('http://localhost:3000/Cadastrados');

      const data = await req.json();

      this.cadastros = data;

    },
  },
  computed: {
    //função de desição tipo de mensagem que vai ser retornada
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
</script>
