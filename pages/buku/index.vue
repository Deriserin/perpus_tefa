<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <h2 class="text-center my-4 fw-bold">BUKU</h2>
        <div class="my-3">
          <form @submit.prevent="getBooks">
            <input type="search" class="form-control from-control rounded-5" placeholder="Mau baca apa hari ini?">
          </form>
        </div>
        <div class="my-3 text-muted">menampilkan 45 dari 45</div>
        <div class="row justify-content-evenly">
          <div v-for="(book, i) in books" :key="i" class="col-sm-3 m-1">
            <nuxt-link :to="`/buku/${book.id}`">
              <div class="card-style">
                <img :src="book.cover" class="cover" alt="cover">
                <div class="card-body">
                  <p class="card-text">{{ book.judul }}</p>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <NuxtLink to="/">
    <button type="button" class="btn btn-primary">kembali</button>
  </NuxtLink>
  </div>
</template>

<script setup>
const supabase= useSupabaseClient()

const keyword = ref('')
const books = ref([])
const jmlbuku = ref(0)

const getbooks = async () => {
  const { data ,error } = await supabase
  .from('buku')
  .select(`*, kategori(*)`)
  .ilike("judul", `%${keyword.value}%`)
  .order('id')
  if(data) books.value = data
}
const getJmlBuku = async () => {
  const{ data, count } = await supabase
    .from("buku") 
    .select('*', { count: "exact" })
    if(data) jmlbuku.value = count
}

onMounted(() =>{
  getbooks()
  getJmlBuku()

})
</script>

<style scoped>
.cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 0 30;
}
.btn {
  background-color: #2C7C5F;
}
</style>