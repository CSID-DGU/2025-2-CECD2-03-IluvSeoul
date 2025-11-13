<template>
    <div class="container-fluid">
        <div class="row row-col-2">
            <div :class="selectedDepartment ? 'col-9' : ''">
                <div class="d-flex flex-row-reverse mb-3">
                    <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#department-modal">
                        <i class="bi-plus"></i>
                        추가
                    </button>

                    <div class="modal fade" id="department-modal" tabindex="-1" aria-labelledby="department-modal-label"
                         aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="department-modal-label">부서 추가</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <input type="text" class="form-control" placeholder="부서명" v-model="newDepartment">
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                                    <button type="button" class="btn btn-primary" @click="createDepartment"
                                            data-bs-dismiss="modal">추가
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                    <div class="card-header d-flex justify-content-center align-items-center position-relative">
                        <h5 class="mb-0">{{ selectedDepartment.name }}</h5>
                        <button
                            type="button"
                            class="btn btn-sm position-absolute end-0 me-2"
                            aria-label="Close"
                            @click="deleteDepartment"
                        >
                            부서 삭제
                            <!--                            <i class="bi bi-x-lg fs-5"></i>-->
                        </button>
                    </div>
                    <div class="card-body">
                        <span class="badge rounded-pill text-bg-secondary d-inline-flex align-items-center m-1"
                              v-for="dt in departmentTagMap[selectedDepartment.id]">{{ tagMap[dt.tag_id].name }}
                              <button type="button" class="border-0 bg-transparent ms-1 p-0" aria-label="Close"
                                      @click="modifyTag(dt.department_id, dt.tag_id, false)">
                                <i class="bi bi-x" style="font-size: 0.8rem; color: white;"></i>
                              </button>
                        </span>
                    </div>
                    <div class="card-footer">
                        <div class="input-group">
                            <input type="text" class="form-control" v-model="newTag">
                            <button class="btn btn-outline-secondary" type="button" @click="modifyTagByName(newTag)">
                                추가
                            </button>
                        </div>

                        <div class="list-group" v-if="newTag">
                            <template v-for="tag in tagMap">
                                <button v-if="tag.name.toLowerCase().includes(newTag.toLowerCase())" type="button"
                                        class="list-group-item list-group-item-action" aria-current="true"
                                        @click="newTag = tag.name">
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
import {computed, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {DepartmentService} from "@/service/department";
import Tag from "@/data/inquiry/tag";

const $store = useStore();

const selectedDepartment = ref<Department>();
const newTag = ref<string>('');
const newDepartment = ref<string>('');

const selectDepartment = (department: Department) => {
    selectedDepartment.value = department;
}

const createDepartment = () => {
    const newDepartmentName = newDepartment.value.trim();
    if (newDepartmentName === '') return;
    DepartmentService.create(newDepartment.value).then(() => {
        $store.dispatch('fetchDepartments')
        $store.dispatch('fetchDepartmentGroups')
    })
}

const deleteDepartment = () => {
    const department_id = selectedDepartment.value?.id;
    if (department_id === undefined) return;
    DepartmentService.del(department_id).then(() => {
            selectedDepartment.value = undefined;
            $store.dispatch('fetchDepartments')
            $store.dispatch('fetchDepartmentGroups')
        }
    )
}

const modifyTagByName = (tag_name: string) => {
    const department_id = selectedDepartment.value?.id;
    if (department_id === undefined) return;
    const tag_id = Object.values(tagMap.value).find((e: Tag) => e.name === tag_name)?.id;
    if (tag_id === undefined)
        return DepartmentService.tag(department_id, null, tag_name, true).then(() => {
            $store.dispatch('fetchDepartmentTags')
        })
    modifyTag(department_id, tag_id, true)
}

const modifyTag = (department_id: number, tag_id: number, is_add: boolean) => {
    DepartmentService.tag(department_id, tag_id, null, is_add).then(() => {
        $store.dispatch('fetchDepartmentTags')
    })
}

const departmentGroupMap = computed(() => $store.getters.getDepartmentGroupMap);
const departmentByGroupId = computed(() => $store.getters.getDepartmentsByGroupId);
const departmentTagMap = computed(() => $store.getters.getDepartmentTagMap);
const tagMap = computed<{ [key: number]: Tag }>(() => $store.getters.getTagMap);
</script>
