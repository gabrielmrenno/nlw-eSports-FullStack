import { ImageBackground } from 'react-native';

import { styles } from './styles';

import backgroundImg from '../../assets/background-galaxy.png'

interface Props {
    children: React.ReactNode
}

export function Background({ children }: Props) {
    return (
        <ImageBackground
            source={backgroundImg}
            // memorize default image -> it turns faster to create
            defaultSource={backgroundImg}
            style={styles.container}
        >
            {children}
        </ImageBackground>
    );
}