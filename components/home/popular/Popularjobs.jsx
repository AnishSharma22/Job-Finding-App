import {useState} from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useRouter } from 'expo-router'

import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants';
import PopularjobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hooks/useFetch';

const Popularjobs = () => {
  const router = useRouter();

  // fetch data
  const {data, isLoading, error} = useFetch(
    'search', {
      query: 'Web',
      num_pages: 1
    }
  );

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.tertiary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          <FlatList
          data = {data}
          renderItem = {({item}) => (
            <PopularjobCard
            item={item}
            selectedJob={selectedJob}
            handleCardPress={handleCardPress}
            />
          )}
          keyExtractor = {item => item?.job_id}
          contentContainerStyle={{columnGap:SIZES.medium}}
          horizontal
          showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs