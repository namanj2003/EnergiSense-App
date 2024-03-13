import React from 'react';
import { View, StyleSheet, Animated, useWindowDimensions} from 'react-native';


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


const styles = StyleSheet.create({
    dot: {
        height: 5,
        borderRadius: 5,
        backgroundColor: '#1295b8',
        marginHorizontal: 5,
        
    },
});

export default Paginator;
