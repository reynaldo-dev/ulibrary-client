import { LottieOptions, useLottie } from 'lottie-react'

interface IProps {
    animationData: LottieOptions['animationData']
}

export const LoadAnimation = ({ animationData }: IProps) => {
    const Options: LottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        height: 1000,
    }
    const { View } = useLottie(Options)
    return <div className=''>{View}</div>
}
