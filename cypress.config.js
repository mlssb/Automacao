const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com/v1/', // URL base para os testes
    viewportWidth: 1280,              // Largura da viewport do navegador
    viewportHeight: 720,              // Altura da viewport do navegador
    retries: {
      runMode: 2,                     // Quantidade de tentativas em caso de falha durante o run mode
      openMode: 0,                    // Quantidade de tentativas em caso de falha durante o open mode
    },
       
    // Configurações do repórter
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports', // Diretório onde os relatórios serão gerados
      overwrite: false, // não sobrescreve relatorios anteriores
      html: true, //gera relatorio em html
      json: true, //gera relatorio em json
      reportFilename: 'report', // Nome do arquivo de relatório
    },
  },
});
