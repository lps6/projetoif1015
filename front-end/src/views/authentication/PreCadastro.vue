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
                            >Queremos te conhecer melhor!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Para que nossos consultores possam te dar o melhor
                            direcionamento possível precisamos saber mais sobre
                            você.
                            <strong>Vamos conversar?</strong></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step1FormValid" ref="myForm1">
                              <v-text-field
                                v-model="name_input"
                                :rules="[rules.required]"
                                name="input-10-1"
                                label="Qual o seu nome?"
                                placeholder="Ex: João da Silva"
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
                                @click="nextStep(1)"
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
                            >Olá, {{ showName }}!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Estamos felizes que você está pensando em investir
                            em tecnologia. Para nós é como investir em nosso
                            próprio futuro.</v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step2FormValid" ref="myForm2">
                              <v-text-field
                                v-model="age_input"
                                :rules="[rules.required]"
                                name="input-10-1"
                                label="Inclusive, qual a sua idade?"
                                placeholder="Ex: 18"
                                type="number"
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
                                  @click="backStep(2)"
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
                                  @click="nextStep(2)"
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
                            >Os {{ showNextAge }} tão chegando,
                            hein?</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Investir e principalmente diversificar seus
                            rendimentos é ideal para fazer seu dinheiro
                            trabalhar para você.</v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step3FormValid" ref="myForm3">
                              <v-select
                                v-model="job_input"
                                :items="jobs"
                                :rules="hasChoosen(job_input)"
                                label="Mas e você? Em que área trabalha?"
                                placeholder="Selecione a sua área de atuação"
                                class=".v-input__slot .v-label .v-text-field input"
                                required
                              ></v-select>
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
                                  @click="backStep(3)"
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
                                  @click="nextStep(3)"
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
              <v-stepper-content step="4">
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
                            >Chegou a hora de conhecer o seu lado
                            investidor.</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Você já sabe que investir é necessário. Agora para
                            entender melhor as suas necessidades, precisamos
                            entender seu perfil de Investidor.</v-card-subtitle
                          >
                          <v-col
                            cols="12"
                            :class="
                              'input-style pb-0 ' +
                                ($mq === 'xs' ? 'pl-0 pr-0' : '')
                            "
                          >
                            <p class="p-style">
                              <strong>
                                Já teve ou tem algum investimento ou aplicação?
                              </strong>
                            </p>
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
                                    ? 'btn-wrapper-mobile-style pl-0 pr-0'
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
                                  @click="backStep(4)"
                                >
                                  <v-icon class="icon-style"
                                    >keyboard_arrow_left</v-icon
                                  >
                                </v-btn>
                              </v-col>
                              <v-col
                                v-if="$mq !== 'xs'"
                                cols="1"
                                class="btn-space-empty"
                              ></v-col>
                              <v-col cols="5" class="">
                                <RoundedBtn
                                  colorBtn="#232533"
                                  block
                                  text="SIM"
                                  :offsetBtnIcon="offset3BtnIcon"
                                  :loading="loading"
                                  bgColorIcon="#484C5F"
                                  btnIcon="check"
                                  btnIconSize="18px"
                                  :haveBtnIcon="$mq === 'xs' ? false : true"
                                  @click="hasMadeInvestments(true)"
                                ></RoundedBtn>
                              </v-col>
                              <v-col cols="5" class="">
                                <RoundedBtn
                                  colorBtn="#FA8D28"
                                  block
                                  text="NÃO"
                                  :offsetBtnIcon="offset3BtnIcon"
                                  :loading="loading"
                                  bgColorIcon="#E08B35"
                                  btnIcon="close"
                                  btnIconSize="18px"
                                  :haveBtnIcon="$mq === 'xs' ? false : true"
                                  @click="hasMadeInvestments(false)"
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
              <v-stepper-content step="5">
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
                            >Para ajudar nossa projeção.</v-card-title
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step5FormValid" ref="myForm5">
                              <v-text-field
                                v-model="income_input"
                                :rules="[rules.required]"
                                name="input-10-1"
                                label="Qual a sua renda média mensal?*"
                                placeholder="Ex: 5.000,00"
                                type="number"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                            </v-form>
                            <p class="warn-style">
                              *Não se preocupe, todas as informações que você
                              está preenchendo são confidenciais e estão
                              protegidas pelos nossos
                              <a
                                href="https://s3.us-east-1.amazonaws.com/oig.capital/condi%C3%A7%C3%A3o%20e%20Termos%20de%20uso%20-%20OIG%20Capital.pdf"
                                target="_blank"
                                rel="noopener"
                                >termos de privacidade</a
                              >.
                            </p>
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
                                    ? 'btn-wrapper-mobile-style pl-0 pr-0'
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
                                  @click="nextStep(5)"
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
                step="6"
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
                            >Qual o seu jeito de investir?</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Sobre o seu perfil de investimento,
                            <strong
                              >qual desses chama mais atenção?</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step6FormValid" ref="myForm6">
                              <v-radio-group
                                v-model="registered_investor_profile"
                                class="mt-1"
                                :rules="hasChoosen(registered_investor_profile)"
                              >
                                <v-radio
                                  label="ARRISCADO E VARIÁVEL COM LUCRATIVIDADE MAIOR."
                                  color="#383A46"
                                  value="ARRISCADO E VARIÁVEL COM LUCRATIVIDADE MAIOR."
                                ></v-radio>
                                <v-radio
                                  label="SEGURO E ESTÁVEL COM LUCRATIVIDADE MAIS BAIXA."
                                  color="#383A46"
                                  value="SEGURO E ESTÁVEL COM LUCRATIVIDADE MAIS BAIXA."
                                ></v-radio>
                                <v-radio
                                  label="NÃO SEI / NÃO TENHO CERTEZA"
                                  color="#383A46"
                                  value="NÃO SEI / NÃO TENHO CERTEZA"
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
                                  @click="backStep(6)"
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
                                  @click="nextStep(6)"
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
                step="7"
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
                            >Para deixar mais sob medida;</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Se você fosse iniciar um investimento hoje,
                            <strong
                              >quais desses valores estariam dentro da sua
                              realidade?</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step7FormValid" ref="myForm7">
                              <v-radio-group
                                v-model="registered_initial_investment"
                                class="mt-1"
                                :rules="
                                  hasChoosen(registered_initial_investment)
                                "
                              >
                                <v-radio
                                  value="ENTRE R$500 E R$1.000"
                                  color="#383A46"
                                >
                                  <template v-slot:label>
                                    <div>
                                      ENTRE
                                      <strong>R$500</strong> E
                                      <strong>R$1.000</strong>
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="ENTRE R$1.000 E R$5.000"
                                  color="#383A46"
                                >
                                  <template v-slot:label>
                                    <div>
                                      ENTRE
                                      <strong>R$1.000</strong> E
                                      <strong>R$5.000</strong>
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="ENTRE R$5.000 E R$10.000"
                                  color="#383A46"
                                >
                                  <template v-slot:label>
                                    <div>
                                      ENTRE
                                      <strong>R$5.000</strong> E
                                      <strong>R$10.000</strong>
                                    </div>
                                  </template>
                                </v-radio>
                                <v-radio
                                  value="MAIS DE R$10.000"
                                  color="#383A46"
                                >
                                  <template v-slot:label>
                                    <div>
                                      MAIS DE
                                      <strong>R$10.000</strong>
                                    </div>
                                  </template>
                                </v-radio>
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
                                  @click="backStep(7)"
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
                                  @click="nextStep(7)"
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
              <v-stepper-content step="8" :class="$mq === 'xs' ? 'mb-7' : ''">
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
                            >Pronto, {{ showName }}!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Estamos quase no fim.
                            <strong
                              >Está sendo excelente conhecer um pouco mais sobre
                              o seu "Eu, Investidor"!</strong
                            ><br />
                            Nossos consultores vão receber seu cadastro e
                            entrarão em contato com você em breve.
                            <strong
                              >Para garantir que vamos conseguir te encontrar
                              com segurança e evitar quaisquer tipo de falhas ou
                              informações inválidas</strong
                            >
                            preciso confirmar mais alguns
                            dados.</v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step8FormValid" ref="myForm8">
                              <v-text-field
                                v-model="email_input"
                                :rules="[rules.required]"
                                :error-messages="emailInvalid"
                                name="input-10-1"
                                label="Qual o seu e-mail?"
                                placeholder="joao@email.com"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                              <v-text-field
                                v-model="confirm_email_input"
                                :rules="[rules.required]"
                                :error-messages="emailInvalid"
                                name="input-10-1"
                                label="Repita o seu e-mail:"
                                placeholder="joao@email.com"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                              <v-text-field
                                v-model="cpf_input"
                                v-mask="['###.###.###-##']"
                                :rules="[rules.required]"
                                :error-messages="cpfInvalid"
                                name="input-10-1"
                                label="Qual o seu CPF?"
                                placeholder="000.000.000-00"
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
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style top-97'
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
                                  @click="backStep(8)"
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
                                  @click="nextStep(8)"
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
                            >Tudo pronto!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Seus dados foram enviados para os nossos
                            consultores,
                            <strong
                              >tudo que eu preciso agora é confirmar seu
                              telefone</strong
                            >
                            para que possamos
                            <strong
                              >te notificar no momento em que sua análise
                              estiver pronta!</strong
                            ></v-card-subtitle
                          >
                          <v-col cols="12" class="input-style pb-0">
                            <v-form v-model="step9FormValid" ref="myForm9">
                              <v-text-field
                                v-model="phone_input"
                                :rules="[rules.required]"
                                name="input-10-1"
                                v-mask="['(##) #####.####']"
                                :error-messages="phoneInvalid"
                                label="Qual o seu telefone celular?"
                                placeholder="Ex: (00) 00000.0000"
                                class=".v-input__slot .v-label .v-text-field input"
                              ></v-text-field>
                              <v-text-field
                                v-model="confirm_phone_input"
                                :rules="[rules.required]"
                                v-mask="['(##) #####.####']"
                                :error-messages="phoneInvalid"
                                name="input-10-1"
                                label="Repita o número de seu celular:"
                                placeholder="Ex: (00) 00000.0000"
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
                              align="center"
                              :class="
                                'justify-center d-flex pt-0 pb-0 ' +
                                  ($mq === 'xs'
                                    ? 'btn-wrapper-mobile-style top-96'
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
                                  @click="backStep(9)"
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
                                  @click="nextStep(9)"
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
              <v-stepper-content step="10">
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
                            >Confirme o seu token!</v-card-title
                          >
                          <v-card-subtitle
                            :class="
                              'card-subtitle-style mt-2 pb-0' +
                                ($mq === 'xs'
                                  ? 'justify-center card-subtitle-mobile-style'
                                  : '')
                            "
                            >Um Token foi enviado pra o número
                            <strong>{{ phone_input }}</strong
                            >, digite-o abaixo para concluir seu
                            cadastro!</v-card-subtitle
                          >
                          <v-col
                            cols="12"
                            class="input-style pb-0 justify-center d-flex"
                            align="center"
                          >
                            <v-text-field
                              v-model="token_input"
                              v-mask="['#-#-#-#']"
                              :rules="[rules.required]"
                              name="input-10-1"
                              label=""
                              single-line=""
                              solo
                              class=".v-input__slot .v-label .v-text-field input centered-input"
                            ></v-text-field>
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
                                  @click="backStep(10)"
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
                                  @click="nextStep(10)"
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
              <v-stepper-content step="11">
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
                            >Investir no futuro é preciso!</v-card-title
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
                              Obrigado por concluir nosso cadastro,
                              <strong>{{ showName }}</strong
                              >! A equipe da OIG Capital já está recebendo seus
                              dados!
                              <strong
                                >Em até 3 dias úteis entraremos em contato pelos
                                meios cadastrados.</strong
                              >
                            </p>
                            <p class="final-msg-style">
                              Até lá, lembre de clicar no e-mail de confirmação
                              que enviamos para você.
                            </p>
                            <p class="final-msg-style">
                              <strong>Não chegou na caixa de entrada?</strong>
                              Basta verificar o Lixo Eletrônico e clicar no link
                              do e-mail. Nos falamos em breve!
                            </p></v-card-subtitle
                          >
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
                                $mq === 'xs'
                                  ? 'btn-wrapper-mobile-style top-96'
                                  : ''
                              "
                            >
                              <RoundedBtn
                                colorBtn="#232533"
                                block
                                text="VOLTAR PARA O SITE"
                                :offsetBtnIcon="offsetBtnIcon"
                                :loading="loading"
                                @click="nextStep(11)"
                              ></RoundedBtn>
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
import { mapActions } from "vuex";

import LoginPassword from "@/components/authentication/LoginPassword";
import RoundedBtn from "@/components/authentication/RoundedBtn";

export default {
  name: "PreCadastro",
  components: {
    LoginPassword,
    RoundedBtn
  },
  data() {
    return {
      name_input: "",
      age_input: null,
      job_input: "",
      jobs: [
        "Autônomo",
        "Agência de Comunicação / Digital",
        "Agência de Turismo / Viagens",
        "Automação comercial / residencial / industrial",
        "Beleza",
        "Concessionária de veículos",
        "Consultoria de TI / RH / Marketing e outros",
        "Contabilidade",
        "Corretora de Seguros",
        "Distribuidora",
        "E-commerce",
        "Editora",
        "Educação",
        "Escritório de advocacia",
        "Eventos",
        "Imobiliária",
        "Importação / Exportação",
        "Indústria",
        "Lojista / Loja Física",
        "Prestador de serviços",
        "Representante comercial",
        "Saúde",
        "Software",
        "Tecnologia",
        "Telecomunicações",
        "Outros"
      ],
      made_investments: null,
      income_input: null,
      email_input: "",
      confirm_email_input: "",
      cpf_input: "",
      phone_input: "",
      confirm_phone_input: "",
      token_input: "",
      stepper_number: 1,
      steps: 11,
      step: "",
      loading: false,
      password: "Password",
      showLoginEmail: true,
      rules: {
        required: value => !!value || "Campo obrigatório!"
      },
      step1FormValid: false,
      step2FormValid: false,
      step3FormValid: false,
      step4FormValid: false,
      step5FormValid: false,
      step6FormValid: false,
      step7FormValid: false,
      step8FormValid: false,
      step9FormValid: false,
      step10FormValid: false,
      step11FormValid: false,
      registered_investor_profile: "",
      registered_initial_investment: "",
      emailInvalid: [],
      cpfInvalid: [],
      phoneInvalid: []
    };
  },
  computed: {
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
    offset3BtnIcon() {
      if (this.$mq === "xs") {
        return "79%";
      } else {
        return "84%";
      }
    },
    showName() {
      var name = this.name_input.split(" ");
      if (name.length === 1) {
        return name[0];
      } else {
        return name[0] + " " + name[1];
      }
    },
    showNextAge() {
      return Number(this.age_input) + 1;
    }
  },
  methods: {
    ...mapActions(["requestPreRegister"]),
    getImage(image) {
      return image ? require(`@/assets/images/${image}`) : "";
    },
    hasMadeInvestments(value) {
      this.made_investments = value;
      this.stepper_number = 4 + 1;
    },
    hasChoosen(input) {
      if (input) {
        return [true];
      } else {
        return ["Campo obrigatório!"];
      }
    },
    isSameEmail() {
      if (this.email_input === this.confirm_email_input) {
        return true;
      } else {
        this.emailInvalid = "E-mails não correspondentes!";
        return false;
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
    isSamePhone() {
      if (this.phone_input === this.confirm_phone_input) {
        return true;
      } else {
        this.phoneInvalid = "Telefones não correspondentes!";
        return false;
      }
    },
    noMask(val) {
      return val.replace(/[^\d]+/g, "");
    },
    nextStep: async function(n) {
      if (n === this.steps) {
        this.stepper_number = 1;
      } else {
        var myForm = "myForm" + n;
        if (this.$refs[myForm].validate()) {
          if ((n === 8) & this.isSameEmail() & this.isCpfValid()) {
            this.stepper_number = n + 1;
          } else if (n === 9 && this.isSamePhone()) {
            var res = await this.requestPreRegister({
              name: this.name_input,
              email: this.email_input,
              phone: this.noMask(this.phone_input),
              cpf: this.noMask(this.cpf_input),
              registered_investor_profile: this.registered_investor_profile,
              registered_initial_investment: this.registered_initial_investment,
              made_investments: this.made_investments,
              registered_occupation_area: this.job_input,
              registered_monthly_income: this.income_input
            });
            if (res.data) {
              this.stepper_number = n + 1;
            }
          } else {
            if (n !== 8 && n !== 9) {
              this.stepper_number = n + 1;
            }
          }
        }
      }
    },
    backStep(n) {
      if (n === 1) {
        this.stepper_number = 1;
      } else {
        this.stepper_number = n - 1;
      }
    }
  },
  watch: {
    steps(val) {
      console.log(val);
      if (this.stepper_number > val) {
        this.stepper_number = val;
      }
    }
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
  font-size: 28px;
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
  font-size: 14px;
  word-break: break-word;
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
  font-size: 14px;
  font-family: $font-secondary;
  font-weight: 400;
  word-break: break-word;
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
