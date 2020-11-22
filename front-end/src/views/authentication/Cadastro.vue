<template>
  <v-container fluid :class="'login-view'">
    <v-row :class="'no-flex border-logo'">
      <v-col cols="12" align="center" class="img-wrapper mt-4 mb-2 pt-0 pb-0">
        <router-link to="/login">
          <img
            :src="getImage('logo.png')"
            alt="Logo OIG-CAPITAL"
            :class="$mq === 'xs' ? 'img-style-mobile' : 'img-style'"
          />
        </router-link>
      </v-col>
    </v-row>
    <LoginPassword
      v-if="!showLoginEmail"
      @callLoginEmailView="loginEmailHandler()"
    ></LoginPassword>
    <v-row
      :align="$mq === 'xs' ? 'flex-start' : 'center'"
      v-if="showLoginEmail"
    >
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-stepper
            v-model="stepper_number"
            :class="$mq === 'xs' ? 'stepper-wrapper-mobile' : 'stepper-wrapper'"
          >
            <v-stepper-header
              :class="$mq === 'xs' ? 'stepper-header-mobile-style' : ''"
            >
              <template v-for="n in steps">
                <v-stepper-step
                  :key="`${n}-step`"
                  :complete="stepper_number > n"
                  :step="step"
                  color="#ffffff"
                  :id="n"
                  complete-icon=""
                >
                  <div :class="stepper_number === n ? 'active-step' : ''"></div>
                  <div :class="stepper_number > n ? 'complete-step' : ''"></div>
                </v-stepper-step>
                <v-divider v-if="n !== steps" :key="n"></v-divider>
              </template>
            </v-stepper-header>
            <v-divider
              :class="$mq === 'xs' ? 'divider-mobile-style' : 'divider-style'"
            ></v-divider>
            <v-stepper-items
              :class="$mq === 'xs' ? 'stepper-items-wrapper-mobile' : ''"
            >
              <v-stepper-content step="1">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >"Quero ser um acionista da OIG!"</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Se você chegou até aqui é porque nossos consultores
                            identificaram que você tem o perfil de se tornar um
                            dos acionistas da One Internet Group! Para que isso
                            seja possível precisamos concluir o seu cadastro.
                            <strong>Vamos prosseguir?</strong></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step1FormValid" ref="myForm1">
                              <v-text-field
                                v-model="cpf_input"
                                v-mask="['###.###.###-##']"
                                :rules="[rules.required]"
                                :error-messages="cpfInvalid"
                                name="input-10-1"
                                label="Qual o seu CPF?"
                                placeholder="Ex: 000.000.000-00"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              :class="
                                $mq === 'xs' ? 'btn-wrapper-mobile-style' : ''
                              "
                            >
                              <RoundedBtn
                                colorBtn="#232533"
                                block
                                text="Prosseguir"
                                :offsetBtnIcon="offsetBtnIcon"
                                :loading="loading"
                                @click="checkCPF()"
                              ></RoundedBtn>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >Informações Pessoais</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Seguindo os dados enviados para análise dos nossos
                            consultores precisamos validar as informações junto
                            com a Receita Federal para garantir que seus
                            contratos de compra e venda de ações sejam
                            legalmente válidos.
                            <strong
                              >Complete os dados abaixo:</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step2FormValid" ref="myForm2">
                              <label class="label-text-style"
                                >Nome Completo</label
                              >
                              <v-text-field
                                :value="name_input"
                                solo
                                disabled
                                name="input-10-2"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <label class="label-text-style"
                                >E-mail Cadastrado</label
                              >
                              <v-text-field
                                solo
                                disabled
                                :value="email_input"
                                :rules="[rules.required]"
                                :error-messages="emailInvalid"
                                name="input-10-3"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <label class="label-text-style"
                                >CPF Cadastrado</label
                              >
                              <v-text-field
                                solo
                                disabled
                                :value="cpf_input"
                                v-mask="['###.###.###-##']"
                                name="input-10-4"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <v-menu
                                ref="menu_date_of_birth"
                                v-model="menu_date_of_birth"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                              >
                                <template v-slot:activator="{ on }">
                                  <v-text-field
                                    v-model="date_of_birth_formated"
                                    label="Qual a sua data de nascimento?"
                                    persistent-hint
                                    append-icon="event"
                                    v-mask="['##/##/####']"
                                    placeholder="Ex: 10/08/1990"
                                    @blur="
                                      date_of_birth = parseDate(
                                        date_of_birth_formated
                                      )
                                    "
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date_of_birth"
                                  no-title
                                  locale="pt-BR"
                                  @input="menu_date_of_birth = false"
                                ></v-date-picker>
                              </v-menu>
                              <v-select
                                v-model="civil_state_input"
                                :items="civil_states"
                                :rules="hasChoosen(civil_state_input)"
                                label="Qual o seu estado civil?"
                                placeholder="Selecione a sua área de atuação"
                                class=".v-input__slot .v-label .v-text-field input"
                                required
                              ></v-select>
                              <v-radio-group
                                v-model="mother_name_input"
                                class="mt-1"
                                :rules="hasChoosen(mother_name_input)"
                              >
                                <template v-slot:label>
                                  <div class="radio-group-question-style">
                                    Qual das opções abaixo é o primeiro nome da
                                    sua mãe?
                                  </div>
                                </template>
                                <v-radio
                                  v-for="name in mother_names"
                                  :key="name"
                                  :label="name"
                                  color="#383A46"
                                  :value="name"
                                ></v-radio>
                              </v-radio-group>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Prosseguir"
                                  :offsetBtnIcon="offsetBtnIcon"
                                  :loading="loading"
                                  @click="doStepTwo()"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >Queremos te conhecer melhor!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Que tal deixar seu painel de controle mais a sua
                            cara?
                            <strong
                              >Envie uma foto para ser a sua Foto de
                              Perfil!</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step3FormValid" ref="myForm3">
                              <!-- Já Uploaded -->
                              <v-row v-show="profile_file_input">
                                <v-col cols="12" class="col-no-padding-topdown">
                                  <img
                                    :src="profile_file_input"
                                    class="file-uploaded-style"
                                    @click="uploadFile('profileFile')"
                                  />
                                </v-col>
                              </v-row>
                              <!-- Não uploaded -->
                              <div
                                class="upload-input-style"
                                v-cloak
                                @drop.prevent="
                                  onFileChange($event, 'profile_file_input')
                                "
                                @dragover.prevent
                                v-show="!profile_file_input"
                              >
                                <v-row @click="uploadFile('profileFile')">
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <img
                                      :src="getIcon('cloud-computing.svg')"
                                      alt="Upload"
                                      class="upload-icon-style"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <p>
                                      Arraste e solte um arquivo ou clique aqui
                                      para enviar
                                    </p>
                                  </v-col>
                                </v-row>
                                <input
                                  ref="profileFile"
                                  type="file"
                                  style="display: none;"
                                  @change="
                                    onFileChange($event, 'profile_file_input')
                                  "
                                />
                              </div>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 mt-3 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style'
                                    : '')
                              "
                            >
                              <v-col :cols="$mq === 'xs' ? '6' : '6'">
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="ENVIAR DEPOIS"
                                  :offsetBtnIcon="offsetBtnIconSameDouble"
                                  :loading="loading"
                                  btnIcon="close"
                                  btnIconSize="18px"
                                  @click="nextStep(3)"
                                ></RoundedBtn>
                              </v-col>
                              <v-col :cols="$mq === 'xs' ? '6' : '6'" class="">
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="ENVIAR"
                                  btnIconSize="18px"
                                  :offsetBtnIcon="offsetBtnIconSameDouble"
                                  :loading="loading"
                                  btnIcon="check"
                                  @click="uploadProfilePicture"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content
                step="4"
                :class="$mq === 'xs' ? 'fixed-width' : ''"
              >
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >Documentação</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            style="fontSize: 11px !important;"
                            ><strong
                              >Escolha um dos documentos abaixo para enviar e
                              prosseguir com seu cadastro:</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step4FormValid" ref="myForm4">
                              <v-radio-group
                                v-model="documentation"
                                class="mt-1"
                                :rules="hasChoosen(documentation)"
                              >
                                <v-radio
                                  label="RG"
                                  color="#383A46"
                                  value="RG"
                                ></v-radio>
                                <v-radio
                                  label="CNH"
                                  color="#383A46"
                                  value="CNH"
                                ></v-radio>
                                <v-radio
                                  label="PASSAPORTE"
                                  color="#383A46"
                                  value="PASSAPORTE"
                                ></v-radio>
                              </v-radio-group>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Prosseguir"
                                  :offsetBtnIcon="offsetBtnIcon"
                                  :loading="loading"
                                  @click="nextStep(4, false)"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <div v-show="documentation === 'RG'">
                <v-stepper-content
                  step="5"
                  :class="$mq === 'xs' ? 'fixed-width mb-7' : ''"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                    >
                      <v-row>
                        <v-card
                          :class="
                            'mx-auto ' +
                              ($mq === 'xs'
                                ? 'card-mobile-style'
                                : 'card-style')
                          "
                        >
                          <v-card-text
                            :class="
                              $mq === 'xs'
                                ? 'card-body-mobile pb-20px padding-sides-15px'
                                : 'card-body pb-0'
                            "
                          >
                            <v-card-title
                              :class="
                                'pb-0 pt-1 ' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-title-mobile-style'
                                    : 'justify-start card-title-style')
                              "
                              >Documento: RG</v-card-title
                            >
                            <v-card-subtitle
                              :class="
                                'card-subtitle-style mt-2 pb-0' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-subtitle-mobile-style'
                                    : '')
                              "
                            >
                              <strong
                                >Complete os dados abaixo:</strong
                              ></v-card-subtitle
                            >
                            <v-col cols="12" class="input-style pb-0">
                              <v-form v-model="step51FormValid" ref="myForm5_1">
                                <v-row>
                                  <v-col cols="9" class="pl-0 pb-0 pt-0">
                                    <v-text-field
                                      v-model="rg_orgao_emissor_input"
                                      :rules="[rules.required]"
                                      name="input-10-5"
                                      label="Órgão Emissor"
                                      placeholder="Ex: SDS"
                                      class=".v-input__slot .v-label .v-text-field input"
                                    >
                                      <template slot="append">
                                        <v-tooltip right>
                                          <template v-slot:activator="{ on }">
                                            <img
                                              :src="getIcon('question.svg')"
                                              alt=""
                                              class="tooltip-img-style"
                                              v-on="on"
                                            />
                                          </template>
                                          <img
                                            :src="
                                              getImage('rg-orgao-emissor.png')
                                            "
                                            alt="RG-Orgao-Emissor"
                                            class="tooltip-img-style"
                                          />
                                        </v-tooltip>
                                      </template>
                                    </v-text-field>
                                  </v-col>
                                  <v-col cols="3" class="pb-0 pt-0">
                                    <v-select
                                      v-model="state_input"
                                      :items="states"
                                      :rules="hasChoosen(state_input)"
                                      label="Estado"
                                      placeholder=" "
                                      class=".v-input__slot .v-label .v-text-field input"
                                      required
                                    ></v-select>
                                  </v-col>
                                </v-row>
                                <!-- RG não usa máscara porque não existe regras para formatação e nem para validação. Cada estado do Brasil tem suas próprias regras -->
                                <v-text-field
                                  v-model="rg_number_input"
                                  :rules="[rules.required]"
                                  name="input-10-6"
                                  label="Número do RG"
                                  placeholder="Ex: 00000000-0"
                                  class=".v-input__slot .v-label .v-text-field input"
                                >
                                  <template slot="append">
                                    <v-tooltip right>
                                      <template v-slot:activator="{ on }">
                                        <img
                                          :src="getIcon('question.svg')"
                                          alt="Tooltip"
                                          class="tooltip-img-style"
                                          v-on="on"
                                        />
                                      </template>
                                      <img
                                        :src="getImage('rg-numero.png')"
                                        alt="RG-Numero"
                                        class="tooltip-img-style"
                                      />
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                                <v-menu
                                  ref="menu_rg_expedition_date"
                                  v-model="menu_rg_expedition_date"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="rg_expedition_date_formated"
                                      label="Data de Expedição"
                                      persistent-hint
                                      append-icon="event"
                                      v-mask="['##/##/####']"
                                      placeholder="Ex: 10/08/1990"
                                      @blur="
                                        rg_expedition_date = parseDate(
                                          rg_expedition_date_formated
                                        )
                                      "
                                      v-on="on"
                                    >
                                      <template slot="append">
                                        <v-tooltip right>
                                          <template v-slot:activator="{ on }">
                                            <img
                                              :src="getIcon('question.svg')"
                                              alt=""
                                              class="tooltip-img-style"
                                              v-on="on"
                                            />
                                          </template>
                                          <img
                                            :src="
                                              getImage('rg-data-expedicao.png')
                                            "
                                            alt="RG-data-expedicao"
                                            class="tooltip-img-style"
                                          />
                                        </v-tooltip>
                                      </template>
                                    </v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="rg_expedition_date"
                                    no-title
                                    locale="pt-BR"
                                    @input="menu_rg_expedition_date = false"
                                  ></v-date-picker>
                                </v-menu>
                                <label class="label-text-style"
                                  >CPF Cadastrado</label
                                >
                                <v-text-field
                                  solo
                                  disabled
                                  :value="cpf_input"
                                  v-mask="['###.###.###-##']"
                                  name="input-10-7"
                                  label="CPF Cadastrado"
                                  placeholder="096.898.534-30"
                                  class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                                ></v-text-field>
                                <p class="label-style">
                                  Foto ou imagem escaneada da frente do RG (Lado
                                  que possui a sua fotografia)
                                </p>
                                <!-- Já Uploaded -->
                                <v-row v-show="rg_frente_file_input">
                                  <v-col
                                    cols="12"
                                    class="col-no-padding-topdown"
                                  >
                                    <img
                                      :src="rg_frente_file_input"
                                      class="file-uploaded-style"
                                      @click="uploadFile('rgFrenteFile')"
                                    />
                                  </v-col>
                                </v-row>
                                <!-- Não uploaded -->
                                <div
                                  class="upload-input-style"
                                  v-cloak
                                  @drop.prevent="
                                    onFileChange($event, 'rg_frente_file_input')
                                  "
                                  @dragover.prevent
                                  v-show="!rg_frente_file_input"
                                >
                                  <v-row @click="uploadFile('rgFrenteFile')">
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <img
                                        :src="getIcon('cloud-computing.svg')"
                                        alt="Upload"
                                        class="upload-icon-style"
                                      />
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <p>
                                        Arraste e solte um arquivo ou clique
                                        aqui para enviar
                                      </p>
                                    </v-col>
                                  </v-row>
                                  <input
                                    ref="rgFrenteFile"
                                    type="file"
                                    style="display: none;"
                                    @change="
                                      onFileChange(
                                        $event,
                                        'rg_frente_file_input'
                                      )
                                    "
                                  />
                                </div>
                                <p class="label-style mt-3">
                                  Foto ou Imagem Escaneada do verso do RG (Lado
                                  que possui as suas informações)
                                </p>
                                <!-- Já Uploaded -->
                                <v-row v-show="rg_verso_file_input">
                                  <v-col
                                    cols="12"
                                    class="col-no-padding-topdown"
                                  >
                                    <img
                                      :src="rg_verso_file_input"
                                      class="file-uploaded-style"
                                      @click="uploadFile('rgVersoFile')"
                                    />
                                  </v-col>
                                </v-row>
                                <!-- Não uploaded -->
                                <div
                                  class="upload-input-style"
                                  v-cloak
                                  @drop.prevent="
                                    onFileChange($event, 'rg_verso_file_input')
                                  "
                                  @dragover.prevent
                                  v-show="!rg_verso_file_input"
                                >
                                  <v-row @click="uploadFile('rgVersoFile')">
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <img
                                        :src="getIcon('cloud-computing.svg')"
                                        alt="Upload"
                                        class="upload-icon-style"
                                      />
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <p>
                                        Arraste e solte um arquivo ou clique
                                        aqui para enviar
                                      </p>
                                    </v-col>
                                  </v-row>
                                  <input
                                    ref="rgVersoFile"
                                    type="file"
                                    style="display: none;"
                                    @change="
                                      onFileChange(
                                        $event,
                                        'rg_verso_file_input'
                                      )
                                    "
                                  />
                                </div>
                              </v-form>
                            </v-col>
                          </v-card-text>
                          <v-card-actions
                            :class="
                              'pt-0 pb-0 ' +
                                ($mq === 'xs'
                                  ? 'card-actions-mobile-style card-body-mobile'
                                  : 'card-actions-style card-body')
                            "
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                align="center"
                                :class="
                                  'justify-center d-flex pt-0 pb-0 ' +
                                    ($mq === 'xs'
                                      ? 'btn-wrapper-mobile-style'
                                      : '')
                                "
                              >
                                <v-col
                                  :cols="$mq === 'xs' ? '2' : '1'"
                                  class="pl-0 pr-0"
                                >
                                  <v-btn
                                    block
                                    rounded
                                    color="#CECECE"
                                    :class="
                                      $mq === 'xs'
                                        ? 'backBtn-mobile-style'
                                        : 'backBtn-style'
                                    "
                                    @click="backStep(5)"
                                  >
                                    <v-icon class="icon-style"
                                      >keyboard_arrow_left</v-icon
                                    >
                                  </v-btn>
                                </v-col>
                                <v-col
                                  :cols="$mq === 'xs' ? '10' : '11'"
                                  class=""
                                >
                                  <RoundedBtn
                                    colorBtn="#232533"
                                    block
                                    text="Prosseguir"
                                    :offsetBtnIcon="offsetBtnIconShared"
                                    :loading="loading"
                                    @click="storeRGdocument()"
                                  ></RoundedBtn>
                                </v-col>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </div>
              <div v-show="documentation === 'CNH'">
                <v-stepper-content
                  step="5"
                  :class="$mq === 'xs' ? 'fixed-width mb-7' : ''"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                    >
                      <v-row>
                        <v-card
                          :class="
                            'mx-auto ' +
                              ($mq === 'xs'
                                ? 'card-mobile-style'
                                : 'card-style')
                          "
                        >
                          <v-card-text
                            :class="
                              $mq === 'xs'
                                ? 'card-body-mobile pb-20px padding-sides-15px'
                                : 'card-body pb-0'
                            "
                          >
                            <v-card-title
                              :class="
                                'pb-0 pt-1 ' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-title-mobile-style'
                                    : 'justify-start card-title-style')
                              "
                              >Documento: CNH</v-card-title
                            >
                            <v-card-subtitle
                              :class="
                                'card-subtitle-style mt-2 pb-0' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-subtitle-mobile-style'
                                    : '')
                              "
                              >Complete os dados abaixo:</v-card-subtitle
                            >
                            <v-col cols="12" class="input-style pb-0">
                              <v-form v-model="step52FormValid" ref="myForm5_2">
                                <label class="label-text-style"
                                  >CPF Cadastrado</label
                                >
                                <v-text-field
                                  solo
                                  disabled
                                  :value="cpf_input"
                                  v-mask="['###.###.###-##']"
                                  name="input-10-8"
                                  placeholder="096.898.534-30"
                                  class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                                >
                                </v-text-field>
                                <v-text-field
                                  v-model="cnh_number_input"
                                  :rules="[rules.required]"
                                  name="input-10-9"
                                  label="Número de Registro"
                                  placeholder="Ex: 00000000000"
                                  class=".v-input__slot .v-label .v-text-field input"
                                >
                                  <template slot="append">
                                    <v-tooltip right>
                                      <template v-slot:activator="{ on }">
                                        <img
                                          :src="getIcon('question.svg')"
                                          alt=""
                                          class="tooltip-img-style"
                                          v-on="on"
                                        />
                                      </template>
                                      <img
                                        :src="
                                          getImage('cnh-numero-registro.png')
                                        "
                                        alt="CNH-numero-registro"
                                        class="tooltip-img-style"
                                      />
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                                <v-row>
                                  <v-col cols="8" class="pl-0 pb-0 pt-0">
                                    <v-text-field
                                      v-model="cnh_rg_number_input"
                                      :rules="[rules.required]"
                                      name="input-10-9-1"
                                      label="Número do RG"
                                      placeholder="Ex: 000000000"
                                      class=".v-input__slot .v-label .v-text-field input"
                                    >
                                      <template slot="append">
                                        <v-tooltip right>
                                          <template v-slot:activator="{ on }">
                                            <img
                                              :src="getIcon('question.svg')"
                                              alt=""
                                              class="tooltip-img-style"
                                              v-on="on"
                                            />
                                          </template>
                                          <img
                                            :src="getImage('cnh-rg-numero.png')"
                                            alt="CNH-RG-numero"
                                            class="tooltip-img-style"
                                          />
                                        </v-tooltip>
                                      </template>
                                    </v-text-field>
                                  </v-col>
                                  <v-col cols="4" class="pb-0 pt-0">
                                    <v-text-field
                                      v-model="cnh_rg_orgao_emissor_input"
                                      :rules="[rules.required]"
                                      name="input-10-9-2"
                                      label="Emissor(RG)"
                                      placeholder="Ex: SSP"
                                      class=".v-input__slot .v-label .v-text-field input"
                                    >
                                      <template slot="append">
                                        <v-tooltip right>
                                          <template v-slot:activator="{ on }">
                                            <img
                                              :src="getIcon('question.svg')"
                                              alt=""
                                              class="tooltip-img-style"
                                              v-on="on"
                                            />
                                          </template>
                                          <img
                                            :src="
                                              getImage(
                                                'cnh-rg-orgao-emissor.png'
                                              )
                                            "
                                            alt="CNH-RG-orgao-emissor"
                                            class="tooltip-img-style"
                                          />
                                        </v-tooltip>
                                      </template>
                                    </v-text-field>
                                  </v-col>
                                </v-row>
                                <label class="label-text-style"
                                  >Data de Nascimento</label
                                >
                                <v-text-field
                                  solo
                                  disabled
                                  :value="formatDate(date_of_birth)"
                                  append-icon="event"
                                  class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                                ></v-text-field>

                                <p class="label-style">
                                  Foto ou imagem escaneada da frente da CNH
                                </p>
                                <!-- Já Uploaded -->
                                <v-row v-show="cnh_file_input">
                                  <v-col
                                    cols="12"
                                    class="col-no-padding-topdown"
                                  >
                                    <img
                                      :src="cnh_file_input"
                                      class="file-uploaded-style"
                                      @click="uploadFile('cnhFile')"
                                    />
                                  </v-col>
                                </v-row>
                                <!-- Não uploaded -->
                                <div
                                  class="upload-input-style"
                                  v-cloak
                                  @drop.prevent="
                                    onFileChange($event, 'cnh_file_input')
                                  "
                                  @dragover.prevent
                                  v-show="!cnh_file_input"
                                >
                                  <v-row @click="uploadFile('cnhFile')">
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <img
                                        :src="getIcon('cloud-computing.svg')"
                                        alt="Upload"
                                        class="upload-icon-style"
                                      />
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <p>
                                        Arraste e solte um arquivo ou clique
                                        aqui para enviar
                                      </p>
                                    </v-col>
                                  </v-row>
                                  <input
                                    ref="cnhFile"
                                    type="file"
                                    style="display: none;"
                                    @change="
                                      onFileChange($event, 'cnh_file_input')
                                    "
                                  />
                                </div>
                              </v-form>
                            </v-col>
                          </v-card-text>
                          <v-card-actions
                            :class="
                              'pt-0 pb-0 ' +
                                ($mq === 'xs'
                                  ? 'card-actions-mobile-style card-body-mobile'
                                  : 'card-actions-style card-body')
                            "
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                align="center"
                                :class="
                                  'justify-center d-flex pt-0 pb-0 ' +
                                    ($mq === 'xs'
                                      ? 'btn-wrapper-mobile-style'
                                      : '')
                                "
                              >
                                <v-col
                                  :cols="$mq === 'xs' ? '2' : '1'"
                                  class="pl-0 pr-0"
                                >
                                  <v-btn
                                    block
                                    rounded
                                    color="#CECECE"
                                    :class="
                                      $mq === 'xs'
                                        ? 'backBtn-mobile-style'
                                        : 'backBtn-style'
                                    "
                                    @click="backStep(5)"
                                  >
                                    <v-icon class="icon-style"
                                      >keyboard_arrow_left</v-icon
                                    >
                                  </v-btn>
                                </v-col>
                                <v-col
                                  :cols="$mq === 'xs' ? '10' : '11'"
                                  class=""
                                >
                                  <RoundedBtn
                                    colorBtn="#232533"
                                    block
                                    text="Prosseguir"
                                    :offsetBtnIcon="offsetBtnIconShared"
                                    :loading="loading"
                                    @click="storeCNHdocument()"
                                  ></RoundedBtn>
                                </v-col>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </div>
              <div v-show="documentation === 'PASSAPORTE'">
                <v-stepper-content
                  step="5"
                  :class="$mq === 'xs' ? 'fixed-width mb-7' : ''"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                    >
                      <v-row>
                        <v-card
                          :class="
                            'mx-auto ' +
                              ($mq === 'xs'
                                ? 'card-mobile-style'
                                : 'card-style')
                          "
                        >
                          <v-card-text
                            :class="
                              $mq === 'xs'
                                ? 'card-body-mobile pb-20px padding-sides-15px'
                                : 'card-body pb-0'
                            "
                          >
                            <v-card-title
                              :class="
                                'pb-0 pt-1 ' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-title-mobile-style'
                                    : 'justify-start card-title-style')
                              "
                              >Documento: Passaporte</v-card-title
                            >
                            <v-card-subtitle
                              :class="
                                'card-subtitle-style mt-2 pb-0' +
                                  ($mq === 'xs'
                                    ? 'justify-center card-subtitle-mobile-style'
                                    : '')
                              "
                              >Complete os dados abaixo:</v-card-subtitle
                            >
                            <v-col cols="12" class="input-style pb-0">
                              <v-form v-model="step53FormValid" ref="myForm5_3">
                                <v-text-field
                                  v-model="passport_number_input"
                                  :rules="[rules.required]"
                                  name="input-10-10"
                                  label="Número do Passaporte"
                                  placeholder="Ex: 00.000.000"
                                  class=".v-input__slot .v-label .v-text-field input"
                                >
                                  <template slot="append">
                                    <v-tooltip right>
                                      <template v-slot:activator="{ on }">
                                        <img
                                          :src="getIcon('question.svg')"
                                          alt=""
                                          class="tooltip-img-style"
                                          v-on="on"
                                        />
                                      </template>
                                      <img
                                        :src="getImage('passaporte-numero.png')"
                                        alt="PASSAPORTE-numero"
                                        class="tooltip-img-style"
                                      />
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                                <v-text-field
                                  v-model="passport_naturalness_input"
                                  :rules="[rules.required]"
                                  name="input-10-11"
                                  label="Naturalidade"
                                  placeholder="Ex: Pernambuco"
                                  class=".v-input__slot .v-label .v-text-field input"
                                >
                                  <template slot="append">
                                    <v-tooltip right>
                                      <template v-slot:activator="{ on }">
                                        <img
                                          :src="getIcon('question.svg')"
                                          alt=""
                                          class="tooltip-img-style"
                                          v-on="on"
                                        />
                                      </template>
                                      <img
                                        :src="
                                          getImage(
                                            'passaporte-naturalidade.png'
                                          )
                                        "
                                        alt="PASSAPORTE-naturalidade"
                                        class="tooltip-img-style"
                                      />
                                    </v-tooltip>
                                  </template>
                                </v-text-field>
                                <v-menu
                                  ref="menu_passport_expedition_date"
                                  v-model="menu_passport_expedition_date"
                                  :close-on-content-click="false"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <template v-slot:activator="{ on }">
                                    <v-text-field
                                      v-model="
                                        passport_expedition_date_formated
                                      "
                                      label="Data de Expedição"
                                      persistent-hint
                                      append-icon="event"
                                      v-mask="['##/##/####']"
                                      placeholder="29/08/1992"
                                      @blur="
                                        passport_expedition_date = parseDate(
                                          passport_expedition_date_formated
                                        )
                                      "
                                      v-on="on"
                                    >
                                      <template slot="append">
                                        <v-tooltip right>
                                          <template v-slot:activator="{ on }">
                                            <img
                                              :src="getIcon('question.svg')"
                                              alt=""
                                              class="tooltip-img-style"
                                              v-on="on"
                                            />
                                          </template>
                                          <img
                                            :src="
                                              getImage(
                                                'passaporte-data-expedicao.png'
                                              )
                                            "
                                            alt="PASSAPORTE-data-expedicao"
                                            class="tooltip-img-style"
                                          />
                                        </v-tooltip>
                                      </template>
                                    </v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="passport_expedition_date"
                                    no-title
                                    locale="pt-BR"
                                    @input="
                                      menu_passport_expedition_date = false
                                    "
                                  ></v-date-picker>
                                </v-menu>
                                <v-text-field
                                  v-model="passport_orgao_emissor_input"
                                  :rules="[rules.required]"
                                  name="input-10-12"
                                  label="Órgão Expeditor"
                                  placeholder="Ex: SSP"
                                  class=".v-input__slot .v-label .v-text-field input"
                                >
                                  <template slot="append">
                                    <v-tooltip right>
                                      <template v-slot:activator="{ on }">
                                        <img
                                          :src="getIcon('question.svg')"
                                          alt=""
                                          class="tooltip-img-style"
                                          v-on="on"
                                        />
                                      </template>
                                      <img
                                        :src="
                                          getImage(
                                            'passaporte-orgao-expeditor.png'
                                          )
                                        "
                                        alt="PASSAPORTE-orgao-expeditor"
                                        class="tooltip-img-style"
                                      />
                                    </v-tooltip>
                                  </template>
                                </v-text-field>

                                <v-row>
                                  <v-col cols="8" class="pl-0 pb-0 pt-0">
                                    <v-text-field
                                      v-model="passport_rg_number_input"
                                      :rules="[rules.required]"
                                      name="input-10-12-1"
                                      label="Número do RG"
                                      placeholder="Ex: 000000000"
                                      class=".v-input__slot .v-label .v-text-field input"
                                    >
                                    </v-text-field>
                                  </v-col>
                                  <v-col cols="4" class="pb-0 pt-0">
                                    <v-text-field
                                      v-model="passport_rg_orgao_emissor_input"
                                      :rules="[rules.required]"
                                      name="input-10-12-2"
                                      label="Emissor(RG)"
                                      placeholder="Ex: SSP"
                                      class=".v-input__slot .v-label .v-text-field input"
                                    >
                                    </v-text-field>
                                  </v-col>
                                </v-row>

                                <p class="label-style">
                                  Foto ou imagem escaneada do passaporte
                                </p>
                                <!-- Já Uploaded -->
                                <v-row v-show="passport_file_input">
                                  <v-col
                                    cols="12"
                                    class="col-no-padding-topdown"
                                  >
                                    <img
                                      :src="passport_file_input"
                                      class="file-uploaded-style"
                                      @click="uploadFile('passportFile')"
                                    />
                                  </v-col>
                                </v-row>
                                <!-- Não uploaded -->
                                <div
                                  class="upload-input-style"
                                  v-cloak
                                  @drop.prevent="
                                    onFileChange($event, 'passport_file_input')
                                  "
                                  @dragover.prevent
                                  v-show="!passport_file_input"
                                >
                                  <v-row @click="uploadFile('passportFile')">
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <img
                                        :src="getIcon('cloud-computing.svg')"
                                        alt="Upload"
                                        class="upload-icon-style"
                                      />
                                    </v-col>
                                    <v-col
                                      cols="12"
                                      align="center"
                                      class="col-no-padding"
                                    >
                                      <p>
                                        Arraste e solte um arquivo ou clique
                                        aqui para enviar
                                      </p>
                                    </v-col>
                                  </v-row>
                                  <input
                                    ref="passportFile"
                                    type="file"
                                    style="display: none;"
                                    @change="
                                      onFileChange(
                                        $event,
                                        'passport_file_input'
                                      )
                                    "
                                  />
                                </div>
                              </v-form>
                            </v-col>
                          </v-card-text>
                          <v-card-actions
                            :class="
                              'pt-0 pb-0 ' +
                                ($mq === 'xs'
                                  ? 'card-actions-mobile-style card-body-mobile'
                                  : 'card-actions-style card-body')
                            "
                          >
                            <v-row>
                              <v-col
                                cols="12"
                                align="center"
                                :class="
                                  'justify-center d-flex pt-0 pb-0 ' +
                                    ($mq === 'xs'
                                      ? 'btn-wrapper-mobile-style'
                                      : '')
                                "
                              >
                                <v-col
                                  :cols="$mq === 'xs' ? '2' : '1'"
                                  class="pl-0 pr-0"
                                >
                                  <v-btn
                                    block
                                    rounded
                                    color="#CECECE"
                                    :class="
                                      $mq === 'xs'
                                        ? 'backBtn-mobile-style'
                                        : 'backBtn-style'
                                    "
                                    @click="backStep(5)"
                                  >
                                    <v-icon class="icon-style"
                                      >keyboard_arrow_left</v-icon
                                    >
                                  </v-btn>
                                </v-col>
                                <v-col
                                  :cols="$mq === 'xs' ? '10' : '11'"
                                  class=""
                                >
                                  <RoundedBtn
                                    colorBtn="#232533"
                                    block
                                    text="Prosseguir"
                                    :offsetBtnIcon="offsetBtnIconShared"
                                    :loading="loading"
                                    @click="storePassportdocument()"
                                  ></RoundedBtn>
                                </v-col>
                              </v-col>
                            </v-row>
                          </v-card-actions>
                        </v-card>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </div>
              <v-stepper-content step="6" :class="$mq === 'xs' ? 'mb-7' : ''">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 header-tootilp-wrapper ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'card-title-style')
                            "
                          >
                            É você mesmo?
                            <v-tooltip right>
                              <template v-slot:activator="{ on }">
                                <img
                                  :src="getIcon('question.svg')"
                                  alt=""
                                  class="tooltip-header-style"
                                  v-on="on"
                                />
                              </template>
                              <img
                                :src="getImage('selfie.png')"
                                alt="RG-data-expedicao"
                                class="tooltip-img-style"
                              />
                            </v-tooltip>
                          </v-card-title>
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Para garantir que os documentos que você enviou são
                            realmente seus precisamos que você envie uma selfie
                            mostrando seu rosto com clareza e fazendo o número 1
                            com a mão.</v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step6FormValid" ref="myForm6">
                              <!-- Já Uploaded -->
                              <v-row v-show="selfie_file_input">
                                <v-col cols="12" class="col-no-padding-topdown">
                                  <img
                                    :src="selfie_file_input"
                                    class="file-uploaded-style"
                                    @click="uploadFile('selfieFile')"
                                  />
                                </v-col>
                              </v-row>
                              <!-- Não uploaded -->
                              <div
                                class="upload-input-style"
                                v-cloak
                                @drop.prevent="
                                  onFileChange($event, 'selfie_file_input')
                                "
                                @dragover.prevent
                                v-show="!selfie_file_input"
                              >
                                <v-row @click="uploadFile('selfieFile')">
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <img
                                      :src="getIcon('cloud-computing.svg')"
                                      alt="Upload"
                                      class="upload-icon-style"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <p>
                                      Arraste e solte um arquivo ou clique aqui
                                      para enviar
                                    </p>
                                  </v-col>
                                </v-row>
                                <input
                                  ref="selfieFile"
                                  type="file"
                                  style="display: none;"
                                  @change="
                                    onFileChange($event, 'selfie_file_input')
                                  "
                                />
                              </div>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 mt-3 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style top-97'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Prosseguir"
                                  :offsetBtnIcon="offsetBtnIcon"
                                  :loading="loading"
                                  @click="uploadSelfiePicture()"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="7">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >Comprovação de Residência</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            ><strong
                              >Complete os dados abaixo:</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step7FormValid" ref="myForm7">
                              <v-row>
                                <v-col cols="9" class="pl-0">
                                  <v-text-field
                                    v-model="address_zip_code_input"
                                    v-mask="['#####-###']"
                                    :rules="[rules.required]"
                                    name="input-10-13"
                                    label="CEP"
                                    placeholder="Ex: 00000-000"
                                    @blur="searchCep()"
                                    class=".v-input__slot .v-label .v-text-field input"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                  <v-select
                                    v-model="address_state_input"
                                    :items="states"
                                    :rules="hasChoosen(address_state_input)"
                                    label="Estado"
                                    placeholder=" "
                                    class=".v-input__slot .v-label .v-text-field input"
                                    required
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="9" class="pl-0">
                                  <v-text-field
                                    v-model="address_street_input"
                                    :rules="[rules.required]"
                                    name="input-10-14"
                                    label="Endereço"
                                    placeholder="Ex: Avenida Brasil"
                                    class=".v-input__slot .v-label .v-text-field input"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3" class="pl-0">
                                  <v-text-field
                                    v-model="address_number_input"
                                    :rules="[rules.required]"
                                    name="input-10-14-1"
                                    label="Número"
                                    placeholder="Ex: 06"
                                    class=".v-input__slot .v-label .v-text-field input"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="6" class="pl-0">
                                  <v-text-field
                                    v-model="address_district_input"
                                    :rules="[rules.required]"
                                    name="input-10-15"
                                    label="Bairro"
                                    placeholder="Ex: Bela Vista"
                                    class=".v-input__slot .v-label .v-text-field input"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                  <v-text-field
                                    v-model="address_city_input"
                                    :rules="[rules.required]"
                                    name="input-10-16"
                                    label="Cidade"
                                    placeholder="Ex: São Paulo"
                                    class=".v-input__slot .v-label .v-text-field input"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-text-field
                                v-model="address_complement_input"
                                name="input-10-17"
                                label="Complemento"
                                placeholder="Ex: Apartamento 00"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                              <p class="label-style residence-label">
                                Foto ou Imagem Escaneada de um comprovante de
                                residência*
                              </p>
                              <p class="sub-label-style">
                                *Só serão aceitos comprovantes em seu nome ou em
                                nome de seus pais.
                              </p>
                              <!-- Já Uploaded -->
                              <v-row v-show="address_receipt_file_input">
                                <v-col cols="12" class="col-no-padding-topdown">
                                  <img
                                    :src="address_receipt_file_input"
                                    class="file-uploaded-style"
                                    @click="
                                      uploadFile('comprovanteResidenciaFile')
                                    "
                                  />
                                </v-col>
                              </v-row>
                              <!-- Não uploaded -->
                              <div
                                class="upload-input-style"
                                v-cloak
                                @drop.prevent="
                                  onFileChange(
                                    $event,
                                    'address_receipt_file_input'
                                  )
                                "
                                @dragover.prevent
                                v-show="!address_receipt_file_input"
                              >
                                <v-row
                                  @click="
                                    uploadFile('comprovanteResidenciaFile')
                                  "
                                >
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <img
                                      :src="getIcon('cloud-computing.svg')"
                                      alt="Upload"
                                      class="upload-icon-style"
                                    />
                                  </v-col>
                                  <v-col
                                    cols="12"
                                    align="center"
                                    class="col-no-padding"
                                  >
                                    <p>
                                      Arraste e solte um arquivo ou clique aqui
                                      para enviar
                                    </p>
                                  </v-col>
                                </v-row>
                                <input
                                  ref="comprovanteResidenciaFile"
                                  type="file"
                                  style="display: none;"
                                  @change="
                                    onFileChange(
                                      $event,
                                      'address_receipt_file_input'
                                    )
                                  "
                                />
                              </div>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 mt-3 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style top-96'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Prosseguir"
                                  :offsetBtnIcon="offsetBtnIcon"
                                  :loading="loading"
                                  @click="storeAddress()"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="8">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                          >
                            <v-col cols="12">
                              <v-row justify="center">
                                <v-avatar color="orange" :size="avatarSize">
                                  <img :src="userProfilePicture" alt="John" />
                                </v-avatar>
                              </v-row>
                            </v-col>
                            Pronto, {{ userNameFormated }}!
                          </v-card-title>
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Agora você só precisa escolher sua
                            senha:</v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step8FormValid" ref="myForm8">
                              <label class="label-text-style"
                                >Nome Completo</label
                              >
                              <v-text-field
                                solo
                                disabled
                                :value="name_input"
                                :rules="[rules.required]"
                                name="input-10-18"
                                placeholder="Fernando Bruno Cavalcanti Ramalho"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <label class="label-text-style"
                                >E-mail Cadastrado</label
                              >
                              <v-text-field
                                solo
                                disabled
                                v-model="email_input"
                                :rules="[rules.required]"
                                name="input-10-19"
                                placeholder="fernandoalume@gmail.com"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <label class="label-text-style"
                                >CPF Cadastrado</label
                              >
                              <v-text-field
                                solo
                                disabled
                                :value="cpf_input"
                                v-mask="['###.###.###-##']"
                                name="input-10-20"
                                placeholder="096.898.534-30"
                                class=".v-input__slot .v-label .v-text-field input disabled-input-style"
                              ></v-text-field>
                              <v-text-field
                                v-model="password_input"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-21"
                                label="Digite uma senha:"
                                hint="Mínimo de 6 caracteres!"
                                placeholder="******"
                                @click:append="show1 = !show1"
                              ></v-text-field>
                              <v-text-field
                                v-model="confirm_password_input"
                                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show2 ? 'text' : 'password'"
                                name="input-10-22"
                                label="Repita a sua senha:"
                                hint="Mínimo de 6 caracteres!"
                                placeholder="******"
                                @click:append="show2 = !show2"
                              ></v-text-field>
                            </v-form>
                          </v-col>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style top-96'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Prosseguir"
                                  :offsetBtnIcon="offsetBtnIcon"
                                  :loading="loading"
                                  @click="storePassword()"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
              <v-stepper-content step="9">
                <v-row>
                  <v-col
                    cols="12"
                    :class="$mq === 'xs' ? 'col-no-padding-sides' : ''"
                  >
                    <v-row>
                      <v-card
                        :class="
                          'mx-auto ' +
                            ($mq === 'xs' ? 'card-mobile-style' : 'card-style')
                        "
                      >
                        <v-card-text
                          :class="
                            $mq === 'xs'
                              ? 'card-body-mobile pb-20px padding-sides-15px'
                              : 'card-body pb-0'
                          "
                        >
                          <v-card-title
                            :class="
                              'pb-0 pt-1 ' +
                                ($mq === 'xs'
                                  ? 'justify-center card-title-mobile-style'
                                  : 'justify-start card-title-style')
                            "
                            >Bem vindo a OIG Capital!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                          >
                            <p class="final-msg-style">
                              Obrigado por concluir seu cadastro
                              <strong>{{ userNameFormated }}</strong
                              >! Você já pode acessar nosso painel onde poderá
                              simular suas compras de ações e observar o
                              rendimento dos últimos meses.
                            </p>
                            <p class="final-msg-style">
                              Assim que nossos Operadores aprovarem os
                              documentos enviados você será notificado e poderá
                              comprar suas Ações e se tornar parte do grupo OIG.
                            </p>
                            <p class="final-msg-style">
                              Até lá, lembre de ficar de olho no email e celular
                              cadastrado! Nos vemos em breve!
                            </p>
                          </v-card-subtitle>
                        </v-card-text>
                        <v-card-actions
                          :class="
                            'pt-0 pb-0 ' +
                              ($mq === 'xs'
                                ? 'card-actions-mobile-style card-body-mobile'
                                : 'card-actions-style card-body')
                          "
                        >
                          <v-row>
                            <v-col
                              cols="12"
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style'
                                    : '')
                              "
                            >
                              <v-col
                                :cols="$mq === 'xs' ? '12' : '12'"
                                class=""
                              >
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="Acessar a plataforma"
                                  :offsetBtnIcon="offsetBtnIconShared"
                                  :loading="loading"
                                  @click="loadLogin()"
                                ></RoundedBtn>
                              </v-col>
                            </v-col>
                          </v-row>
                        </v-card-actions>
                      </v-card>
                    </v-row>
                  </v-col>
                </v-row>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import LoginPassword from "@/components/authentication/LoginPassword";
import RoundedBtn from "@/components/authentication/RoundedBtn";

export default {
  name: "Cadastro",
  components: {
    LoginPassword,
    RoundedBtn
  },
  data() {
    return {
      // Informações pessoais
      uuid: "",
      name_input: "",
      email_input: "",
      cpf_input: "",
      mother_name_input: "",
      mother_names: ["Luciana", "Aurélia", "Taciana", "Renata"],
      civil_states: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"],
      civil_state_input: "",
      date_of_birth: new Date().toISOString().substr(0, 10),
      date_of_birth_formated: "",

      // Foto de perfil
      profile_file_input: null,

      // Documentação
      documentation: "RG",
      // -> RG
      rg_number_input: "",
      rg_orgao_emissor_input: "",
      rg_expedition_date: new Date().toISOString().substr(0, 10),
      rg_expedition_date_formated: "",
      rg_frente_file_input: null,
      rg_verso_file_input: null,
      state_input: "",
      // -> CNH
      cnh_number_input: "",
      cnh_rg_number_input: "",
      cnh_rg_orgao_emissor_input: "",
      cnh_file_input: null,
      // -> Passaporte
      passport_number_input: "",
      passport_naturalness_input: "",
      passport_expedition_date: new Date().toISOString().substr(0, 10),
      passport_expedition_date_formated: "",
      passport_orgao_emissor_input: "",
      passport_rg_number_input: "",
      passport_rg_orgao_emissor_input: "",
      passport_file_input: null,
      // -> Selfie
      selfie_file_input: "",
      // -> Endereço
      address_zip_code_input: "",
      address_street_input: "",
      address_number_input: "",
      address_complement_input: "",
      address_district_input: "",
      address_city_input: "",
      address_state_input: "",
      address_receipt_file_input: "",

      // Senha
      password_input: "",
      confirm_password_input: "",
      password: "Password",

      // Date picker menu
      menu_passport_expedition_date: false,
      menu_rg_expedition_date: false,
      menu_cnh_date_of_birth: false,
      menu_date_of_birth: false,

      // Stepper
      stepper_number: 1,
      steps: 9,
      step: "",
      step1FormValid: false,
      step2FormValid: false,
      step3FormValid: false,
      step4FormValid: false,
      step51FormValid: false,
      step52FormValid: false,
      step53FormValid: false,
      step6FormValid: false,
      step7FormValid: false,
      step8FormValid: false,
      step9FormValid: false,
      step10FormValid: false,
      step11FormValid: false,

      // Outros
      states: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO"
      ],
      show1: false,
      show2: false,
      token_input: "",
      loading: false,
      showLoginEmail: true,
      rules: {
        required: value => !!value || "Campo obrigatório!"
      },
      emailInvalid: [],
      cpfInvalid: [],
      phoneInvalid: []
    };
  },
  computed: {
    ...mapGetters([
      "getName",
      "getProfilePicUrl",
      "getEmail",
      "getUuid",
      "getIsRegistered"
    ]),
    offsetBtnIcon() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "95%";
      }
    },
    offsetBtnIconShared() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "94%";
      }
    },
    offsetBtnIconSameDouble() {
      if (this.$mq === "xs") {
        return "88%";
      } else {
        return "89%";
      }
    },
    offset3BtnIcon() {
      if (this.$mq === "xs") {
        return "79%";
      } else {
        return "84%";
      }
    },
    avatarSize() {
      if (this.$mq === "xs") {
        return "80";
      } else {
        return "87";
      }
    },
    computedDateOfBirth() {
      return this.formatDate(this.date_of_birth);
    },
    userNameFormated() {
      let splitted_name = this.name_input.split(" ");
      return [splitted_name[0], splitted_name[splitted_name.length - 1]].join(
        " "
      );
    },
    userProfilePicture() {
      if (this.profile_file_input) return this.profile_file_input;
      return this.getImage("user_profile_picture_placeholder.png");
    }
  },
  methods: {
    ...mapActions([
      "requestGetCEP",
      "requestRegisterStep",
      "requestSetRegisterStep",
      "requestUploadProfilePicture",
      "requestUploadSelfiePicture",
      "requestStoreRG",
      "requestStoreCNH",
      "requestStorePassport",
      "requestStoreAddress",
      "requestStorePassword",
      "requestCheckCPF",
      "requestMatchCPF",
      "requestStoreMaritalStatus"
    ]),
    loadLogin() {
      this.$router.push({ name: "login" });
    },
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    getIcon(icon) {
      return icon ? require(`@/assets/icons/${icon}`) : "";
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [day, month, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    searchCep: async function() {
      if (this.isEmpty(this.address_zip_code_input)) return;
      this.loading = true;
      let res = await this.requestGetCEP(this.address_zip_code_input);
      if (res.status == 200) {
        this.address_street_input = res.data.logradouro;
        this.address_district_input = res.data.bairro;
        this.address_city_input = res.data.localidade;
        this.address_state_input = res.data.uf;
      } else {
        console.info("Warning [CEP não encontrado]", res);
        this.cleanAddress();
      }
      this.loading = false;
    },
    cleanAddress: function() {
      this.address_street_input = "";
      this.address_district_input = "";
      this.address_city_input = "";
      this.address_state_input = "";
    },
    hasChoosen(input) {
      if (input) {
        return [true];
      } else {
        return ["Campo obrigatório!"];
      }
    },
    isCpfValid() {
      if (this.cpf_input && this.cpf_input.length === 14) {
        return true;
      } else {
        this.cpfInvalid = "CPF inválido!";
        return false;
      }
    },
    noMask(val) {
      return val.replace(/[^\d]+/g, "");
    },
    nextStep: async function(n, should_save_progress = true) {
      if (n === this.steps) {
        this.stepper_number = 1;
      } else {
        // var myForm = "myForm" + n;
        this.stepper_number = n + 1;
        if (should_save_progress) {
          await this.setStep(n + 1);
        }
      }
    },
    backStep(n) {
      if (n === 1) {
        this.stepper_number = 1;
      } else {
        this.stepper_number = n - 1;
      }
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-GetInvestorUuidRegisterStep
    getStep: async function() {
      let step = 1;
      this.loading = true;
      let res = await this.requestRegisterStep(this.uuid);
      if (res.code == "SUCCESS") {
        step = res.data;
      } else {
        console.error("Erro [get register step]", res);
      }
      this.loading = false;
      return step;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PutInvestorUuidRegisterStep
    setStep: async function(step) {
      this.loading = true;
      let res = await this.requestSetRegisterStep({
        uuid: this.uuid,
        value: step
      });
      if (res.code != "SUCCESS") {
        console.error("Erro [set register step]", res);
      }
      this.loading = false;
    },
    // addDropFile(e, key) {
    //   this[key] = e.dataTransfer.files[0];
    // },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterProfile_picture
    uploadProfilePicture: async function() {
      if (this.profile_file_input == null) return;
      this.loading = true;
      let res = await this.requestUploadProfilePicture({
        uuid: this.uuid,
        value: this.profile_file_input
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(3);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register profile picture]", res);
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterSelfie_picture
    uploadSelfiePicture: async function() {
      if (this.selfie_file_input == null) return;
      this.loading = true;
      let res = await this.requestUploadSelfiePicture({
        uuid: this.uuid,
        value: this.selfie_file_input
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(6);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register selfie picture]", res);
      }
      this.loading = false;
    },
    uploadFile(inputRef) {
      this.$refs[inputRef].click();
    },
    onFileChange(e, key) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0], key);
    },
    createImage(file, key) {
      // eslint-disable-next-line no-unused-vars
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm[key] = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    // eslint-disable-next-line no-unused-vars
    removeImage: function(e) {
      this.upload_file_input = "";
    },
    isEmpty: function(val) {
      return val == null || val.length == 0;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterRg
    storeRGdocument: async function() {
      // Valida campos antes de submeter
      if (this.isEmpty(this.rg_number_input)) return;
      if (this.isEmpty(this.rg_expedition_date)) return;
      if (this.isEmpty(this.state_input)) return;
      if (this.isEmpty(this.rg_orgao_emissor_input)) return;
      if (this.isEmpty(this.rg_frente_file_input)) return;
      if (this.isEmpty(this.rg_verso_file_input)) return;
      this.loading = true;
      let res = await this.requestStoreRG({
        uuid: this.uuid,
        form: {
          number: this.rg_number_input,
          emission_date: this.rg_expedition_date,
          uf: this.state_input,
          emitting: this.rg_orgao_emissor_input,
          front: this.rg_frente_file_input,
          back: this.rg_verso_file_input
        }
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(5);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register RG]", res);
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterCnh
    storeCNHdocument: async function() {
      // Valida campos antes de submeter
      if (this.isEmpty(this.cnh_number_input)) return;
      if (this.isEmpty(this.cnh_rg_number_input)) return;
      if (this.isEmpty(this.cnh_rg_orgao_emissor_input)) return;
      if (this.isEmpty(this.cnh_file_input)) return;
      this.loading = true;
      let res = await this.requestStoreCNH({
        uuid: this.uuid,
        form: {
          number: this.cnh_number_input,
          rg_number: this.cnh_rg_number_input,
          rg_emitting: this.cnh_rg_orgao_emissor_input,
          file: this.cnh_file_input
        }
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(5);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register CNH]", res);
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterPassport
    storePassportdocument: async function() {
      // Valida campos antes de submeter
      if (this.isEmpty(this.passport_number_input)) return;
      if (this.isEmpty(this.passport_naturalness_input)) return;
      if (this.isEmpty(this.passport_expedition_date)) return;
      if (this.isEmpty(this.passport_orgao_emissor_input)) return;
      if (this.isEmpty(this.passport_rg_number_input)) return;
      if (this.isEmpty(this.passport_rg_orgao_emissor_input)) return;
      if (this.isEmpty(this.passport_file_input)) return;
      this.loading = true;
      let res = await this.requestStorePassport({
        uuid: this.uuid,
        form: {
          number: this.passport_number_input,
          naturalness: this.passport_naturalness_input,
          emission_date: this.passport_expedition_date,
          emitting: this.passport_orgao_emissor_input,
          rg_number: this.passport_rg_number_input,
          rg_emitting: this.passport_rg_orgao_emissor_input,
          file: this.passport_file_input
        }
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(5);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register Passport]", res);
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterAddress
    storeAddress: async function() {
      if (this.isEmpty(this.address_zip_code_input)) return;
      if (this.isEmpty(this.address_street_input)) return;
      if (this.isEmpty(this.address_number_input)) return;
      if (this.isEmpty(this.address_district_input)) return;
      if (this.isEmpty(this.address_city_input)) return;
      if (this.isEmpty(this.address_state_input)) return;
      if (this.isEmpty(this.address_receipt_file_input)) return;
      this.loading = true;
      let form_data = {
        zip_code: this.address_zip_code_input,
        street: this.address_street_input,
        number: this.address_number_input,
        district: this.address_district_input,
        city: this.address_city_input,
        state: this.address_state_input,
        receipt: this.address_receipt_file_input
      };
      if (!this.isEmpty(this.address_complement_input))
        form_data.complement = this.address_complement_input;
      let res = await this.requestStoreAddress({
        uuid: this.uuid,
        form: form_data
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(7);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [register address]", res);
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterPassword
    storePassword: async function() {
      if (this.isEmpty(this.password_input)) return;
      if (this.isEmpty(this.confirm_password_input)) return;
      if (this.password_input !== this.confirm_password_input) return;
      this.loading = true;
      let res = await this.requestStorePassword({
        uuid: this.uuid,
        value: this.password_input
      });
      if (res.code == "SUCCESS") {
        await this.nextStep(8);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        if (res.code == "ER_FIELD") {
          console.error(
            "A senha não é forte o suficiente. Crie uma senha com no mínimo 6 caracteres e use ao menos uma letra minúscula e um número.",
            res.errors
          );
        } else {
          console.error("Erro [register password]", res);
        }
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterCpf
    checkCPF: async function() {
      if (this.isEmpty(this.cpf_input)) return;
      this.loading = true;
      let res = await this.requestCheckCPF({
        uuid: this.uuid,
        value: this.noMask(this.cpf_input)
      });
      if (res.code == "SUCCESS") {
        this.name_input = res.data.user_real_name;
        this.mother_names = res.data.mother_names;
        await this.nextStep(1);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        if (res.code == "ER_INVALID_CPF") {
          console.error("CPF inválido");
        } else {
          console.error("Erro [check cpf situation]", res);
        }
      }
      this.loading = false;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterMatch
    matchCPF: async function() {
      if (this.isEmpty(this.date_of_birth)) return;
      if (this.isEmpty(this.mother_name_input)) return;
      let match = false;
      this.loading = true;
      let res = await this.requestMatchCPF({
        uuid: this.uuid,
        form: {
          birthday_date: this.date_of_birth,
          mother_name: this.mother_name_input
        }
      });
      if (res.code == "SUCCESS") {
        if (res.data) {
          // resposta correta
          match = true;
        } else {
          // TODO: alertar o usuario
          console.error("Informações incorretas");
        }
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [match user data with db]", res);
      }
      this.loading = false;
      return match;
    },
    // Ver: https://api.oig.capital/apidoc/#api-Investidor_-_Registro-PostInvestorUuidRegisterMarital_status
    storeMaritalStatus: async function() {
      if (this.isEmpty(this.civil_state_input)) return;
      this.loading = true;
      let res = await this.requestStoreMaritalStatus({
        uuid: this.uuid,
        form: {
          marital_status: this.civil_state_input
        }
      });
      if (res.code == "SUCCESS") {
        this.nextStep(2);
      } else {
        // TODO: mostrar feedback do erro para o usuário
        console.error("Erro [store marital status]", res);
      }
      this.loading = false;
    },
    doStepTwo: async function() {
      let user_match = await this.matchCPF();
      if (user_match) {
        await this.storeMaritalStatus();
      }
    },
    auth: function() {
      if (!this.getName || !this.getEmail || !this.getUuid) return false;
      if (this.getIsRegistered) return false;
      this.uuid = this.getUuid;
      this.name_input = this.getName;
      this.email_input = this.getEmail;
      return true;
    },
    init: async function() {
      if (this.auth()) {
        this.stepper_number = await this.getStep();
      } else {
        console.error("Unauthenticated user");
        this.loadLogin();
      }
    }
  },
  watch: {
    steps(val) {
      if (this.stepper_number > val) {
        this.stepper_number = val;
      }
    },
    // eslint-disable-next-line no-unused-vars
    date_of_birth(val) {
      this.date_of_birth_formated = this.formatDate(this.date_of_birth);
    },
    // eslint-disable-next-line no-unused-vars
    rg_expedition_date(val) {
      this.rg_expedition_date_formated = this.formatDate(
        this.rg_expedition_date
      );
    },
    // eslint-disable-next-line no-unused-vars
    passport_expedition_date(val) {
      this.passport_expedition_date_formated = this.formatDate(
        this.passport_expedition_date
      );
    }
  },
  mounted: async function() {
    await this.init();
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/globalStyles.scss";

.login-view {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background-image: url(~@/assets/images/bgg.png);
  display: flex;
  flex-direction: column;
  background-position: center;
}
.border-logo {
  border-bottom: 1px solid #383a46;
}
.card-title-style {
  font-family: $font-main-bolder;
  font-size: 26px;
  color: #454b60;
  font-weight: 800;
  word-break: break-word;
}
.card-title-mobile-style {
  font-family: $font-main-bolder;
  font-size: 20px;
  color: #232533;
  font-weight: 800;
  word-break: break-word;
  padding-left: 0;
  text-align: center;
  padding-right: 0;
}
.card-subtitle-style {
  font-family: $font-secondary;
  font-size: 13px;
  word-break: break-word;
  text-align: justify;
  color: #454b60 !important;
}
.card-subtitle-mobile-style {
  font-family: $font-secondary;
  word-break: break-word;
  font-size: 16px;
  text-align: center;
  color: #454b60 !important;
  padding-left: 0;
  padding-right: 0;
}
.card-body {
  padding-top: 0;
}
.caller-style {
  font-size: 14px;
}
.caller-mobile-style {
  font-size: 14px;
  color: $color-white;
}
.input-style {
  padding-left: 16px !important;
}
.final-msg-style {
  font-size: 13px;
  font-family: $font-secondary;
  font-weight: 400;
  word-break: break-word;
  letter-spacing: normal;
  line-height: 20px;
}
::v-deep .v-input .v-label {
  height: 25px;
  line-height: 20px;
  font-size: 18px;
  font-weight: 600;
  color: #454b60 !important;
}
::v-deep .v-text-field__slot {
  font-size: 15px;
}
::v-deep .v-text-field input {
  padding: 10px 0 6px;
}
.rules-style {
  color: $color-white;
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 0px;
}
.rules-mobile-style {
  color: $color-white;
  font-size: 12px;
  font-weight: 800;
  margin-bottom: 0px;
}
.copyright-style {
  color: #f5f5f6;
}
.copyright-mobile-style {
  font-size: 12px;
  color: #f5f5f6;
}
.link-style {
  color: transparent;
}
.img-style {
  width: 10%;
  height: auto;
  object-fit: cover;
}
.img-style-mobile {
  width: 40%;
  height: auto;
  object-fit: cover;
}
.flex-grow-1 {
  flex-grow: 1;
}
.no-flex {
  flex: 0;
}
.stepper-wrapper {
  width: 550px;
  border-radius: 20px;
  border-color: #707070;
}
.stepper-wrapper-mobile {
  width: 550px;
  border-radius: 20px;
  border-color: #707070;
  box-shadow: none;
  background: transparent !important;
}
.stepper-items-wrapper-mobile {
  background-color: #dadbde;
  border-radius: 30px;
}
.stepper-header-mobile-style {
  padding: 0px 0px !important;
}
.active-step {
  width: 16px;
  background-color: #fa8d28;
  height: 16px;
  border: 1px solid #fa8d28;
  border-radius: 30px;
  top: 22px;
  position: absolute;
  left: 22px;
}
.complete-step {
  width: 16px;
  background-color: #383a46;
  height: 16px;
  border: 1px solid #383a46;
  border-radius: 30px;
  top: 22px;
  position: absolute;
  left: 22px;
}
.divider-style {
  border-width: thin 1px 1px 1px;
  border-color: #e1e1e1;
}
.divider-mobile-style {
  border-width: thin 1px 1px 1px;
  border-color: #e1e1e1;
  display: none;
}
.card-style {
  border: none;
  box-shadow: none;
}
.card-mobile-style {
  background: #dadbde;
  border: none;
  box-shadow: none;
}
.p-style {
  font-size: 15px;
  line-height: 20px;
  font-weight: 600;
  color: #454b60 !important;
}
.backBtn-style {
  height: 40px !important;
  padding: 0 !important;
}
.backBtn-mobile-style {
  height: 48px !important;
  padding: 0 !important;
}
.icon-style {
  color: $color-white !important;
  font-size: 22px;
  font-weight: 800;
}
.warn-style {
  word-break: break-word;
  font-size: 12px;
}
.btn-space-empty {
  max-width: min-content;
  padding: 10px;
}
.btn-wrapper-mobile-style {
  position: absolute;
  top: 95%;
}
.col-no-padding-sides {
  padding-left: 0;
  padding-right: 0;
}
.col-no-padding-topdown {
  padding-top: 0;
  padding-bottom: 0;
}
.col-no-padding {
  padding: 0;
}
.card-body-mobile {
  padding-left: 0;
  padding-right: 0;
}
.top-96 {
  top: 96.5%;
}
.top-97 {
  top: 97.5%;
}
.fixed-width {
  width: 330px;
}
.radio-group-question-style {
  font-size: 14px;
}
.upload-input-style {
  cursor: pointer;
  border-width: thin 1px 1px 1px;
  border: 1px #c9c9c9 solid;
  background-color: #fcfcfc;
  border-radius: 4px;
  height: 160px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.upload-wrapper {
  border: none;
  padding: 0px;
  margin: 0px;
  height: 140px;
}
.upload-icon-style {
  width: 100%;
  height: auto;
  max-width: 10%;
}
.file-uploaded-style {
  width: 60%;
  margin: auto;
  display: block;
  height: auto;
  object-fit: cover;
  border: 1px solid #c9c9c9;
  border-width: thin 1px 1px 1px;
  margin-bottom: 0;
  margin-top: 0;
}
.file-uploaded-style:hover {
  width: 60%;
  margin: auto;
  display: block;
  height: auto;
  object-fit: cover;
  border: 1px solid #c9c9c9;
  border-width: thin 1px 1px 1px;
  margin-bottom: 0;
  margin-top: 0;
  cursor: pointer;
}
.label-style {
  font-family: $font-main-bolder;
  color: #454b60;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: normal;
  line-height: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: 7px;
}
.residence-label {
  margin-bottom: 0px;
}
.sub-label-style {
  font-family: $font-main;
  color: #9e9e9e;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: normal;
  line-height: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin-top: 0px;
  margin-bottom: 10px;
}
.label-text-style {
  height: 25px;
  line-height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #454b60 !important;
}
.disabled-input-style {
  height: 52px;
}
.tooltip-img-style {
  width: 85%;
  height: auto;
  object-fit: cover;
}
.header-tootilp-wrapper {
  display: flex;
  justify-content: space-between !important;
}
.tooltip-header-style {
  width: 20px;
}
::v-deep .disabled-input-style > .v-input__control > .v-input__slot {
  box-shadow: none !important;
  border-width: thin 1px 1px 1px;
  border: 1px solid #cfcfcf;
  background-color: #ebebeb;
  min-height: 33px;
}
::v-deep .centered-input input {
  text-align: center;
}
::v-deep .theme--light.v-stepper .v-stepper__header .v-divider {
  border-color: #383a46;
  border-width: thin 1px 1px 1px;
}
::v-deep .v-stepper__header .v-divider {
  margin: 0 -24px;
}
::v-deep .v-stepper__step__step {
  margin-right: 0px !important;
  border: 2px solid #383a46;
}
::v-deep .v-stepper__step {
  padding: 18px;
}
::v-deep .v-stepper__header {
  box-shadow: none;
  padding: 0px 70px;
  height: 60px;
}
::v-deep
  .theme--light.v-stepper
  .v-stepper__step:not(.v-stepper__step--active):not(.v-stepper__step--complete):not(.v-stepper__step--error)
  .v-stepper__step__step {
  background-color: #ffffff !important;
}
::v-deep .v-stepper__step--complete .v-stepper__step__step {
  border-color: #383a46 !important;
}
::v-deep .v-stepper__step__step .v-icon.v-icon {
  font-size: 1rem;
}
::v-deep .v-stepper__content {
  padding: 0px 14px 12px 14px;
}
::v-deep .v-btn--contained {
  box-shadow: none;
}
::v-deep .v-input input {
  font-size: 14px;
  font-family: $font-secondary;
}
::v-deep .v-select__selections {
  font-size: 14px;
  font-family: $font-secondary;
}
::v-deep .v-input--selection-controls .v-radio > .v-label {
  font-size: 14px;
  font-weight: 400;
}
@media screen and (max-width: 599px) {
  ::v-deep .v-text-field__slot {
    input {
      text-align: center;
    }
  }
  ::v-deep .v-input .v-label {
    height: 25px;
    line-height: 20px;
    font-size: 18px;
    font-weight: 800;
    color: #454b60 !important;
    width: 600px;
    text-align: center;
  }
  ::v-deep .v-stepper__wrapper {
    overflow: visible;
  }
  ::v-deep .v-stepper__items {
    overflow: visible;
  }
  ::v-deep .v-stepper {
    overflow: visible;
  }
  .p-style {
    font-size: 15px;
    line-height: 20px;
    font-weight: 600;
    color: #454b60 !important;
    text-align: center;
  }
  .warn-style {
    word-break: break-word;
    font-size: 12px;
    text-align: center;
  }
  ::v-deep .v-input--selection-controls .v-radio > .v-label {
    font-size: 14px;
    font-weight: 400;
    text-align: left;
  }
  ::v-deep .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: inherit;
  }
}

@media screen and (max-width: 320px) {
  .fixed-width {
    width: 305px;
  }
}
</style>
