export default defineNuxtConfig({
  devtools: { enabled: true},
  css:["bootstrap/dist/css/bootstrap.min.css"],
  
  modules:["@nuxtjs/supabase"],
  supabase:{redirect: false},
})
