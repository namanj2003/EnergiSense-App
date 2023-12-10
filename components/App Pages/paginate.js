import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions, Dimensions} from 'react-native';


const Paginator = ({data, scrollX}) => {
    const {width} = useWindowDimensions();
    return (
        <View style={{flexDirection:'row', justifyContent:"center"}}>
            {data.map((_, i) => {
                const inputRange = [(i-1)*width, i*width, (i+1)*width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10,35,10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.5,1,0.5],
                    extrapolate: 'clamp',
                });
                return <Animated.View style={[styles.dot,{width:dotWidth, opacity}]} key={i.toString()} />;
            })}
        </View>
    );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
    
    dot: {

        height: 10,
        borderRadius: 5,
        backgroundColor: '#1295b8',
        marginHorizontal: 5,
        marginTop:"auto"
        // marginTop:"auto",
        // marginBottom:"auto",
        // marginBottom:height/4+30,
        
    },
});

export default Paginator;
