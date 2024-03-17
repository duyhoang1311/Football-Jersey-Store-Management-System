<template>
    <div class="background py-3">
        <div class="container bg-white px-5 py-2">
            <div class="pt-2">
                <form class="form-inline my-2 mx-lg-1 d-flex">
                    <input
                        v-model="searchKeyword"
                        class="form-control pr-5 search-input flex-grow-1"
                        type="search"
                        placeholder="Bạn cần tìm gì hôm nay?"
                    />
                    <button class="btn my-sm-0 search-button px-4" type="submit" @click.prevent="handleSearchSubmit">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
            <div class="row">
                <div class="container-find col-3">
                    <h2 class="mt-4 text-center fw-bold find-title">Tìm Theo</h2>
                    <div class="row shadow rounded-2 p-3">
                        <div class="col-sm">
                            <div class="text-center">Câu lạc bộ</div>
                            <div class="form-check" v-for="team in teams" :key="team">
                                <input class="form-check-input" type="checkbox" :value="team" v-model="selectedTeams" />
                                <label class="form-check-label">{{ team }}</label>
                            </div>
                        </div>
                    </div>

                    <div class="row shadow rounded-2 mt-3 p-3">
                        <div class="col-sm">
                            <div class="text-center">Loại áo</div>
                            <div class="form-check" v-for="loaiSP in listLoaiSanPham" :key="loaiSP">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    :value="loaiSP"
                                    v-model="selectedLoaiSP"
                                />
                                <label class="form-check-label">{{ loaiSP }}</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-items col-9 p-5">
                    <div v-auto-animate class="row d-flex">
                        <div class="col-sm-2 p-1" v-for="hangHoa in filteredHangHoa" :key="hangHoa.MSHH">
                            <div class="card h-100" @click="openHangHoaModal(hangHoa)">
                                <img
                                    v-if="hangHoa.images && hangHoa.images.length > 0"
                                    :src="getImageUrl(hangHoa)"
                                    class="card-img-top"
                                    alt="Hình hàng hóa"
                                />
                                <div class="card-body p-2">
                                    <h5 class="card-title pb-2">{{ hangHoa.TenHH }}</h5>
                                </div>
                                <div class="card-footer bg-white p-2">
                                    <div class="text-danger mb-1 card-price">{{ formatGia(hangHoa.Gia) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hang-hoa-modal :hangHoa="this.selectedHangHoa" />
    </div>
</template>

<script>
import HangHoaService from '../services/HangHoa.service';
import HangHoaModal from './HangHoaModal.vue';

export default {
    components: {
        HangHoaModal,
    },
    data() {
        return {
            listHangHoa: [],
            teams: ['Manchester United', 'Real Madrid', 'Barcelona', 'Inter Miami', 'Arsenal'],
            selectedTeams: [],
            listLoaiSanPham: ['Áo thun', 'Áo khoác', 'Áo bóng đá'],
            selectedLoaiSP: [],
            searchKeyword: '',
            selectedHangHoa: null,
        };
    },
    computed: {
        filteredHangHoa() {
            if (this.selectedTeams.length === 0 && this.selectedLoaiSP.length === 0 && this.searchKeyword === '') {
                return this.listHangHoa;
            } else {
                let filteredList = this.listHangHoa;
                if (this.selectedTeams.length > 0 && this.searchKeyword === '') {
                    filteredList = filteredList.filter((hangHoa) => this.selectedTeams.includes(hangHoa.DoiBong));
                }

                if (this.selectedLoaiSP.length > 0 && this.searchKeyword === '') {
                    filteredList = filteredList.filter((hangHoa) => this.selectedLoaiSP.includes(hangHoa.LoaiSanPham));
                }

                if (this.searchKeyword.trim() !== '') {
                    const keyword = this.searchKeyword.toLowerCase();
                    console.log('keyword', keyword);

                    filteredList = filteredList.filter((hangHoa) => hangHoa.TenHH.toLowerCase().includes(keyword));
                }
                return filteredList;
            }
        },
    },
    mounted() {
        this.getListHangHoa();
    },
    methods: {
        async getListHangHoa() {
            try {
                const hangHoaData = await HangHoaService.getAllHangHoa();
                this.listHangHoa = hangHoaData.listHangHoa;
                console.log(this.$data.searchKeyword);
            } catch (error) {}
        },
        getImageUrl(hangHoa) {
            const imageName =
                hangHoa.images && hangHoa.images.length > 0 ? hangHoa.images[0].TenHinh.split('\\').pop() : '';

            console.log('Image Name:', imageName);

            return imageName ? `http://localhost:4000/api/hang-hoa/image/${imageName}` : '';
        },
        formatGia(value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        },
        openHangHoaModal(hangHoa) {
            this.selectedHangHoa = hangHoa;
            console.log('this.selectedHangHoa', this.selectedHangHoa);
            $('#hangHoaModal').modal('show');
        },
    },
};
</script>
