import Vue from 'vue'
import VueFilePond from 'vue-filepond'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

const FilePond = VueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

Vue.component('VFilePond', FilePond)
