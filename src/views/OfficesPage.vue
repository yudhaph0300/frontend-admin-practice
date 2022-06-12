<template>
  <v-app>
    <h1 class="text-center mb-10">Office List</h1>

    <!-- Start Dialog Add Data -->
    <div class="ml-10">
        <v-dialog
        v-model="dialogAdd"
        persistent
        max-width="800px"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
            >
            Add Office
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
            <span class="text-h5">Add Data Office</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                <v-col cols="12">
                    <v-text-field
                    label="Name"
                    v-model="form.name"
                    required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                    label="Location"
                    v-model="form.location"
                    required
                    ></v-text-field>
                </v-col>

                <v-col cols="3">
                    <v-text-field
                    label="Min Capacity"
                    v-model="form.kursi_min"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                    label="Max Capacity"
                    v-model="form.kursi_max"
                    required
                    ></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                    label="Price"
                    v-model="form.price"
                    required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-textarea
                    outlined
                    label="Description"
                    v-model="form.description"
                    required
                    ></v-textarea>
                </v-col>
                
                </v-row>
                
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                
                @click="dialogAdd = false"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="addOffice"
            >
                Add Data
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
    <!-- End Dialog Add Data -->

    <!-- Start Dialog Edit Data -->
    <div>
        <v-dialog
        v-model="dialogEdit"
        persistent
        max-width="800px"
        >
        <v-card>
            <v-card-title>
            <span class="text-h5">Edit Data Office</span>
            </v-card-title>
            <v-card-text>
            <v-container>
                <v-row>
                  <v-col cols="12">
                      <v-text-field
                      label="Name"
                      v-model="form.name"
                      required
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                      <v-text-field
                      label="Location"
                      v-model="form.location"
                      required
                      ></v-text-field>
                  </v-col>

                  <v-col cols="3">
                      <v-text-field
                      label="Min Capacity"
                      v-model="form.kursi_min"
                      required
                      ></v-text-field>
                  </v-col>
                  <v-col cols="3">
                      <v-text-field
                      label="Max Capacity"
                      v-model="form.kursi_max"
                      required
                      ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                      <v-text-field
                      label="Price"
                      v-model="form.price"
                      required
                      ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                      <v-textarea
                      outlined
                      label="Description"
                      v-model="form.description"
                      required
                      ></v-textarea>
                  </v-col>
                </v-row>
                
            </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                
                @click="dialogEdit = false"
            >
                Cancel
            </v-btn>
            <v-btn
                color="primary"
                @click="updateOffice()"
            >
                Edit Data
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
    <!-- End Dialog Add Data -->

    <v-simple-table class="mx-10">
        <template v-slot:default>
        <thead>
            <tr>
            <th class="text-left">
                Id
            </th>
            <th class="text-left">
                Photo
            </th>
            <th class="text-left">
                Created by
            </th>
            <th class="text-left">
                Name
            </th>
            <th class="text-left">
                Description
            </th>
            <th class="text-left">
                Location
            </th>
            <th class="text-left">
                Price
            </th>
            <th class="text-left">
                Capacity
            </th>
            <th class="text-center">
                Action
            </th>
            </tr>
        </thead>
        <tbody>
            <tr
            v-for="office in offices"
            :key="office.id"
            >
                <td>{{ office.id }}</td>
                <td>
                  <img :src="office.photo" width="100px" alt="">
                </td>
                <td>{{ office.created_by }}</td>
                <td>{{ office.name }}</td>
                <td>{{ office.description }}</td>
                <td>{{ office.location }}</td>
                <td>{{ office.price }}</td>
                <td>{{ office.kursi_min }} - {{ office.kursi_max }}</td>

                <td class="text-center mx-auto">
                    
                    <v-btn
                    width="100%"
                    class="my-1"
                    dark
                    color="green"
                    @click="modeEdit(office.id)"
                    >
                        Edit
                    </v-btn>

                    <v-btn
                    width="100%"
                    class="my-1"
                    dark
                    color="red lighen-4"
                    @click="deleteOffice(office.id)"
                    >
                        Delete
                    </v-btn>
                </td>
            </tr>
        </tbody>
        </template>
    </v-simple-table>




  </v-app>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'OfficesPage',
    data() {
      return {
              offices: [],
              dialogAdd: false,
              dialogEdit: false,
              indexId: null,
              form: {
                created_by: 1,
                name: '',
                description:'',
                location:'',
                price:'',
                kursi_min: null,
                kursi_max: null,
                photo: "https://ik.imagekit.io/yudha/practice_admin/room_1_3qvD5PqxS?ik-sdk-version=javascript-1.4.3&updatedAt=1654877227603"
              },
          }
      },
      async mounted() {
        this.load()
    },
    methods: {
        async load() {
            const response = await axios.get(`http://localhost:3000/offices`)
            this.offices = response.data
        },
        async addOffice() {
            try {
                await axios.post(`http://localhost:3000/offices`, this.form)
                this.load()
                this.created_by = 1
                this.name = ''
                this.description =''
                this.location =''
                this.price =''
                this.kursi_min = null
                this.kursi_max = null
                this.photo = "https://ik.imagekit.io/yudha/practice_admin/room_1_3qvD5PqxS?ik-sdk-version=javascript-1.4.3&updatedAt=1654877227603"
                this.dialogAdd = false
            } catch (error) {
                console.log(error)
                this.dialogAdd = false
            }
        },
        async deleteOffice(id) {
            await axios.delete(`http://localhost:3000/offices/`+id)
            this.load()
        },
        modeEdit(id){
            this.indexId = id
            this.dialogEdit = true
        },
        async updateOffice() {

            try {
                await axios.put(`http://localhost:3000/offices/`+this.indexId, {
                created_by: this.form.created_by,
                name: this.form.name,
                description:this.form.description,
                location:this.form.location,
                price: this.form.price,
                kursi_min: this.form.kursi_min,
                kursi_max: this.form.kursi_max,
                photo: this.form.photo
                })

                this.load()
                this.indexId = null
                this.form.created_by = 1
                this.form.name = ''
                this.form.description =''
                this.form.location =''
                this.form.price =''
                this.form.kursi_min = null
                this.form.kursi_max = null
                this.form.photo = "https://ik.imagekit.io/yudha/practice_admin/room_1_3qvD5PqxS?ik-sdk-version=javascript-1.4.3&updatedAt=1654877227603"
                this.dialogEdit = false
            } catch (error) {
                console.log(error)    
            }


            
            
        }
    }
  }
</script>
