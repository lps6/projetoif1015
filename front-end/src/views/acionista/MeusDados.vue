<template>
  <div>
    <v-container fluid class="p-0 m-0" v-if="projecaoRendimentos">
      <ProjecaoRendimentos></ProjecaoRendimentos>
    </v-container>
    <v-container
      fluid
      class="vg-acionista-wrapper p-0"
      v-if="!projecaoRendimentos"
    >
      <v-row>
        <v-col cols="12" class="p-0 m-0">
          <div class="section-header">
            <SectionHeader
              sectionText="Meus Dados"
              sectionTextColor="#888990"
            ></SectionHeader>
          </div>
        </v-col>
        <v-row class="content-wrapper">
          <v-col cols="12">
            <div class="avatar-wrapper">
              <div class="money-progress d-flex justify-center align-center">
                <v-progress-circular
                  :value="95"
                  size="100"
                  color="#FA8D28"
                  rotate="270"
                  width="8"
                >
                  <v-avatar color="orange" :size="avatarSize">
                    <img
                      src="https://cdn.vuetifyjs.com/images/john.jpg"
                      alt="John"
                    />
                  </v-avatar>
                </v-progress-circular>
              </div>
              <h2 class="avatar-name">{{ avatar_name.toUpperCase() }}</h2>
              <p class="cargo-style text-center">Acionista</p>
            </div>
          </v-col>
          <v-col cols="12">
            <InfoCard headerText="Dados Pessoais" cardColor="#D6D6D6">
              <template v-slot:card-body-content>
                <v-row class="padding-row">
                  <v-col cols="4">
                    <PersonalData
                      icon="person"
                      colorIcon="#ffffff"
                      value="Fernando Bruno Cavalcanti Ramalho"
                      labelName="NOME COMPLETO"
                      disabled
                    ></PersonalData>
                  </v-col>
                  <v-col cols="4">
                    <PersonalData
                      icon="person"
                      colorIcon="#ffffff"
                      value="096.585.957-84"
                      labelName="CPF"
                      disabled
                    ></PersonalData>
                  </v-col>
                  <v-col cols="4">
                    <PersonalData
                      icon="person"
                      colorIcon="#ffffff"
                      value="29/08/1992"
                      labelName="DATA DE NASCIMENTO"
                      disabled
                    ></PersonalData>
                  </v-col>
                </v-row>
                <v-row class="padding-row">
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="Masculino"
                      labelName="SEXO"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="Solteiro"
                      labelName="ESTADO CIVIL"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="fernandoalume@gmail.com"
                      labelName="E-MAIL"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="(81) 9999-9999"
                      labelName="CELULAR"
                    ></PersonalData>
                  </v-col>
                </v-row>
              </template>
            </InfoCard>
          </v-col>
          <v-col cols="12">
            <InfoCard
              headerText="Endereço"
              cardColor="#9F9F9F"
              headerColor="#ffffff"
            >
              <template v-slot:card-body-content>
                <v-row class="padding-row">
                  <v-col cols="4">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="Rua Quarenta e Oito"
                      labelName="LOGRADOURO"
                      colorLabel="#ffffff"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="4">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="1026"
                      colorLabel="#ffffff"
                      labelName="NÚMERO"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="4">
                    <PersonalData
                      icon="edit"
                      colorLabel="#ffffff"
                      colorIcon="#ffffff"
                      value="53050-380"
                      labelName="CEP"
                    ></PersonalData>
                  </v-col>
                </v-row>
                <v-row class="padding-row">
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="Sala 08"
                      colorLabel="#ffffff"
                      labelName="COMPLEMENTO"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="ENCRUZILHADA"
                      labelName="BAIRRO"
                      colorLabel="#ffffff"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      colorLabel="#ffffff"
                      value="Recife"
                      labelName="CIDADE"
                    ></PersonalData>
                  </v-col>
                  <v-col cols="3">
                    <PersonalData
                      icon="edit"
                      colorIcon="#ffffff"
                      value="(81) 9999-9999"
                      labelName="CELULAR"
                      colorLabel="#ffffff"
                    ></PersonalData>
                  </v-col>
                </v-row>
              </template>
            </InfoCard>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SectionHeader from "@/components/general/SectionHeader";
import ProjecaoRendimentos from "@/components/acionista/ProjecaoRendimentos";
import InfoCard from "@/components/acionista/InfoCard";
import PersonalData from "@/components/acionista/PersonalData";
import { mapMutations } from "vuex";

export default {
  name: "MeusDados",
  components: {
    SectionHeader,
    ProjecaoRendimentos,
    InfoCard,
    PersonalData
  },
  data() {
    return {
      avatar_name: "Fernando Ramalho"
    };
  },
  computed: {
    avatarSize() {
      if (this.$mq === "xs") {
        return "80";
      } else {
        return "87";
      }
    }
  },
  methods: {
    ...mapMutations(["SET_EXPANDEDDRAWER"]),
    clickHandler() {
      this.$emit("click");
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    showProjecaoRendimentos() {
      this.SET_EXPANDEDDRAWER(true);
      this.projecaoRendimentos = !this.projecaoRendimentos;
    },
    getColor(val) {
      if (val === "COMPRA" || val === "ATIVO") {
        // green
        return "#76AF83";
      } else if (val === "VENDA" || val === "AGUARDANDO ASSINATURA") {
        // orange
        return "#FA8D28";
      } else if (val === "SAQUE") {
        // dark blue
        return "#454B60";
      } else if (val === "REJEITADO") {
        // wine
        return "#C96A6A";
      } else {
        return "#000000";
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.vg-acionista-wrapper {
  background-color: #e9e9e9;
  min-height: 100vh;
}
.padding-row {
  padding: 0rem 1rem;
}
.content-wrapper {
  padding-left: 0.5rem;
  padding-right: 2rem;
  padding-top: 0.5rem;
}
.img-style {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.img-wrapper {
  position: relative;
}
.avatar-name {
  display: flex;
  justify-content: center;
  color: #ffffff;
}
.cargo-style {
  color: #ffffff;
}
.avatar-wrapper {
  border-radius: 20px;
  padding-top: 10px;
  background-image: url("~@/assets/images/projecao-rendimentos-bg.png") !important;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
}
.question-wrapper {
  position: absolute;
  top: 25px;
  width: 27px;
  height: 27px;
  background-color: #ffffffd6;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 25px;
}
.question-style {
  color: #303767;
  font-weight: 800;
}
.projecao-btn {
  position: absolute;
  top: 225px;
  left: 20px;
}
.btn-style {
  width: 340px;
  height: 45px !important;
}
.btn-style:hover {
  width: 340px;
  height: 45px !important;
}
.table-style {
  border-radius: 20px !important;
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #fff;
}
::v-deep table {
  .v-data-table-header {
    background-color: #454b60;
  }
  thead tr th {
    color: #ffffff !important;
    i {
      color: #ffffff !important;
    }
  }
  tbody tr:nth-child(odd):hover {
    background-color: #eeeeee;
  }
  tbody tr:nth-child(even):hover {
    background-color: #ffffff !important;
  }
  tbody tr {
    height: 60px;
    .v-chip.v-size--default {
      height: 25px !important;
    }
    .v-chip .v-chip__content {
      font-size: 0.775rem;
      justify-content: center;
      width: 159px;
    }
    .v-chip {
      padding: 0 20px;
    }
  }
  tbody tr:nth-child(odd) {
    background-color: #eeeeee;
  }
  tbody tr td {
    font-size: 0.775rem;
    border: #eeeeee !important;
  }
}
::v-deep .table-title {
  border-radius: 20px !important;
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #fff;
  height: 80px !important;
  .v-toolbar__title {
    color: #303767;
    font-family: $font-main-bolder;
    font-size: 1.45rem;
    font-weight: 800;
  }
  .v-toolbar__content {
    padding: 1rem 2rem;
    padding-top: 2rem;
  }
}
::v-deep .content-wrapper {
  .info-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    border-radius: 20px;
  }
  .text-style {
    font-size: 12px;
  }
  .value-style {
    font-size: 20px;
  }
}
::v-deep .btn-style {
  .v-btn__content {
    color: #303767;
    font-family: $font-main-bolder;
    i {
      color: #ffffff;
    }
  }
}
</style>
