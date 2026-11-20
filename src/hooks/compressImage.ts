// 压缩图片：等比缩放 + 有损导出，返回 base64
export function compressImage(file: File, maxSize = 200, quality = 0.7): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = () => {
            const img = new Image()
            img.onerror = reject
            img.onload = () => {
                // 等比缩放：最长边不超过 maxSize
                let { width, height } = img
                if (width > height && width > maxSize) {
                    height = Math.round((height * maxSize) / width)
                    width = maxSize
                } else if (height >= width && height > maxSize) {
                    width = Math.round((width * maxSize) / height)
                    height = maxSize
                }

                const canvas = document.createElement('canvas')
                canvas.width = width
                canvas.height = height
                const ctx = canvas.getContext('2d')!
                ctx.drawImage(img, 0, 0, width, height)

                // 第二个参数是质量，0~1，越小体积越小
                resolve(canvas.toDataURL('image/jpeg', quality))
            }
            img.src = reader.result as string
        }
        reader.readAsDataURL(file)
    })
}