// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

// import { defineConfig } from '#q-app/wrappers';
import { configure } from 'quasar/wrappers';
import { fileURLToPath } from 'node:url';
import path from 'path'; // ✅ Alias için path modülü

export default configure((ctx) => {
  return {


    boot: [
      'axios',
      'i18n',


    ],
css: ['/app.scss'],



    extras: [
       'fontawesome-v6',
      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],


    build: {

      target: {
        browser: [ 'es2022', 'firefox115', 'chrome115', 'safari14' ],
        node: 'node20'

      },

      typescript: {
        strict: true,
        vueShim: true

      },

      vueRouterMode: 'history', // available values: 'hash', 'history'


      alias: {
        '@': path.resolve(__dirname, 'src'), // "@" => src klasörünü gösterir
      },


      vitePlugins: [
         ['@intlify/unplugin-vue-i18n/vite', {
          ssr: ctx.modeName === 'ssr',
          include: [fileURLToPath(new URL('./src/i18n', import.meta.url))]
        }]
      ]
    },

    devServer: {
      // https: true,
      open: true // opens browser window automatically
    },

    framework: {
        iconSet: 'fontawesome-v6',
      config: {},

      plugins: ['Notify']
    },

    animations: [],


    ssr: {
      prodPort: 3000, // The default port that the production server should use
                      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ],



      pwa: false

    },


    pwa: {
      workboxMode: 'GenerateSW' // 'GenerateSW' or 'InjectManifest'

    },

    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },


    capacitor: {
      hideSplashscreen: true
    },

    electron: {

      preloadScripts: [ 'electron-preload' ],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {

      },

      builder: {

        appId: 'polipersjournal'
      },

    },


    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: []
    }
  }
});
