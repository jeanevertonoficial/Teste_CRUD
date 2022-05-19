<template>

  <MessegesDeAlerts
      class="mensagem"
      :txt_mensagem="msg"
      :class="estiloDaMensagem"
      v-show="msg"
  />

  <TituloPagina :titulo="titulo"/>

  <div class="container-md d-flex flex-wrap justify-content-lg-start m-auto">
    <div
        class="card flex-wrap mb-3 mt-3 m-lg-3"
        style="max-width: 18rem;"
        v-for="dados in cadastros"
        :key="dados.id"
        @change="updatedcadastrado($event, dados.id)"
    >
      <div class="card-header ">
        <h5 class="card-title text-capitalize">#{{ dados.id }}</h5>
      </div>
      <div class="card-body">
        <div class="card-text card-text d-flex flex-column">
          <label>Nome</label>
          <input type="text" :value="dados.nome"></div>
        <div class="card-text d-flex flex-column">
          <label for="sexo">Genero</label>
          <input type="text" id="sexo" :value="dados.sexo">
        </div>
        <div class="card-text d-flex flex-column">
          <label for="idade">Idade</label>
          <input type="number" id="idade" :value="dados.idade">
        </div>
        <div class="card-text d-flex flex-column">
          <label for="data_nasc">Data Nascimento</label>
          <input type="text" id="data_nasc" :value="dados.data_nasc">
        </div>
        <div class="div-botao">
          <ButtomBase
              @click.prevent="deleteUsuario(dados.id)"
              :btn_text="excluir"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="container-md">
    <p class="alert alert-warning" v-if="cadastros == 0">Nenhum resgistro encontrado...</p>
  </div>

</template>

<script>
import TituloPagina from "@/components/shared/TituloPagina";
import ButtomBase from "@/components/shared/Buttom-base";
import MessegesDeAlerts from "@/components/MessegesDeAlerts";

export default {
  name: "ListaCadastrados",
  components: {TituloPagina, ButtomBase, MessegesDeAlerts},
  data() {
    return {
      titulo: "LISTA DE USUÁRIOS",
      msg: null,

      nome: null,
      sobrenome: null,
      sexo: null,
      idade: null,

      // botão
      excluir: 'Excluir',

      // api
      cadastros: []
    }
  },
  methods: {
    async getUsuarios() {

      const req = await fetch('http://localhost:3000/Cadastrados');

      const data = await req.json();

      this.cadastros = data;

      //console.log(this.cadastros)
    },

    async deleteUsuario(id) {

      const req = await fetch(`http://localhost:3000/Cadastrados/${id}`, {
        method: "DELETE"
      })

      const res = await req.json();

      // mensagem após excluir usuario
      this.estilo = 'sucesso'
      this.msg = `Usuário de N°${res.id}, Removido com sucesso!`

      setTimeout(() => this.msg = "", 3000)

      this.getUsuarios();

    },

    async updatedcadastrado(event, id) {

      const dados = event.target.value;

      // metodo JSON.stringify converte dados do javascript para json
      const dataJson = JSON.stringify({nome: dados});

      const req = await fetch(`http://localhost:3000/Cadastrados/${id}`, {
        // PATCH é como o update mais só atualiza oque foi mudado.
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: dataJson
      });

      const res = await req.json();

      // Mensagem
      this.msg = `#${res.id} atualizado com sucesso (RECARREGA A PÁGINA) para ver a atualização!`

      setTimeout(() => this.msg = "", 3500)

    }

  },
  mounted() {
    this.getUsuarios();
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
</script>

<style scoped>

.div-botao {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.11);
}

.botao-personalizado {
  margin: 5px;
}

.card-text label, .card-title label {
  font-weight: bold;
}

.card-text input {
  border: none;
  border-radius: 5px;
}

.card-text input:hover {
  transition: 0.3s;
  background: rgba(171, 169, 169, 0.15);
}

.card-text, .card-title {
  margin: 10px auto;
}

@media screen and (max-width: 551px) {
  .container-md {
    justify-content: center;
  }
}
</style>