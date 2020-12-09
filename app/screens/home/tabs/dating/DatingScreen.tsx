import FunnyHeader from 'components/FunnyHeader'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function DatingScreen({ navigation }: any) {
    return (
        <>
            <FunnyHeader title='Hẹn Hò' navigation={ navigation } />
        </>
    )
}

const styles = StyleSheet.create({})
