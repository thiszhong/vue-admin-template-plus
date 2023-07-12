<script setup>
const uploadFn = async (data) => {
    const formData = new FormData()
    formData.append('file', data.raw)
    // await http request ...
    return { url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
}
</script>

<template>
	<MainContainer>
		<div>
            <p class="mb-8">未设置上传函数，使用时控制台会有提示</p>
            <MyImageUploader :material="false" />
        </div>
        <div>
            <p class="mt-24 mb-8">设置图片上传函数，或在全局（App.vue）provide('MyImageUpload', uploadFn)：</p>
            <MyImageUploader :material="false" :upload="uploadFn" />
        </div>
        <div>
            <p class="mt-24 mb-8">带素材面板 & 自定义尺寸：</p>
            <MyImageUploader :upload="uploadFn" style="--img-width:300px;--img-height:150px;" />
        </div>
	</MainContainer>
</template>
