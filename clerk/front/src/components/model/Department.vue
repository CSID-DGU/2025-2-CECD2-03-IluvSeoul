<template>
    <div class="container-fluid">
        <div class="row row-col-2">
            <div :class="selectedDepartment ? 'col-9' : ''">
                <div class="row row-cols-lg-6 row-cols-md-2 row-cols-sm-1 g-4">
                    <div class="col" v-for="departmentGroup in departmentGroupMap">
                        <div class="card">
                            <h5 class="card-header text-center">{{ departmentGroup.name }}</h5>
                            <div class="card-body">
                                <div class="list-group list-group-flush">
                                    <button type="button" class="list-group-item list-group-item-action"
                                            @click="selectDepartment(department)"
                                            v-for="department in departmentByGroupId[departmentGroup.id].filter((e: Department) => e.id > 0)">
                                        {{ department.name }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="selectedDepartment" class="col" style="border-left: 1px dashed #333;">
                <div class="card">
                    <h5 class="card-header text-center">{{ selectedDepartment.name }}</h5>
                    <div class="card-body">
                        <span class="badge rounded-pill text-bg-secondary d-inline-flex align-items-center m-1" v-for="dt in departmentTagMap[selectedDepartment.id]">{{ tagMap[dt.tag_id].name }}
                              <button type="button" class="border-0 bg-transparent ms-1 p-0" aria-label="Close">
                                <i class="bi bi-x" style="font-size: 0.8rem; color: white;"></i>
                              </button>
                        </span>
                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="newTag">
                            <button class="btn btn-outline-secondary" type="button">추가</button>
                        </div>

                        <div class="list-group" v-if="newTag">
                            <template v-for="tag in tagMap">
                                <button v-if="tag.name.toLowerCase().includes(newTag.toLowerCase())" type="button" class="list-group-item list-group-item-action" aria-current="true" @click="newTag = tag.name">
                                    {{ tag.name }}
                                </button>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Department from "@/data/inquiry/department";
import {computed, ref} from "vue";
import {useStore} from "vuex";

const $store = useStore();

const selectedDepartment = ref<Department>();
const newTag = ref<string>('');

const selectDepartment = (department: Department) => {
    selectedDepartment.value = department;
}

const departmentGroupMap = computed(() => $store.getters.getDepartmentGroupMap);
const departmentByGroupId = computed(() => $store.getters.getDepartmentsByGroupId);
const departmentTagMap = computed(() => $store.getters.getDepartmentTagMap);
const tagMap = computed(() => $store.getters.getTagMap);
</script>

<style scoped>
</style>