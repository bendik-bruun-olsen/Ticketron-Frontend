import React from 'react'

interface ImageModalProps {
    isVisible: boolean
    onCancel: () => void
    imgUrl: string
}
const ImageModal: React.FC<ImageModalProps> = ({
    isVisible,
    onCancel,
    imgUrl,
}) => {
    if (!isVisible) return null
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full h-full p-4 max-w-screen-sm">
                <div onClick={onCancel} className="text-5xl">
                    X
                </div>
                <div className="h-full">
                    <img src={imgUrl} className="object-fill w-full"></img>
                </div>
            </div>
        </div>
    )
}
export default ImageModal
