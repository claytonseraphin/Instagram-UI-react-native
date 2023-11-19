import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';

import Title from '../../components/Title/Title';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';

import style from './style';
import UserStory from '../../components/UserStory/UserStory';

import UserPost from '../../components/UserPost/UserPost';
import {scaleFontSize} from '../../assets/styles/scaling';

import globalStyle from '../../assets/styles/globalStyle';
import {Routes} from '../../navigation/Routes';

const Home = ({navigation}) => {
  const userStories = [
    {
      firstName: 'Rose',
      id: 1,
      profileImage: require('../../assets/images/default_profile.png'),
    }, //0
    {
      firstName: 'Angel',
      id: 2,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Fabien',
      id: 3,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Michelle',
      id: 4,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Ingrid',
      id: 5,
      profileImage: require('../../assets/images/default_profile.png'),
    }, //4
    {
      firstName: 'Parks',
      id: 6,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Umar',
      id: 7,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Syd',
      id: 8,
      profileImage: require('../../assets/images/default_profile.png'),
    },
    {
      firstName: 'Medgy',
      id: 9,
      profileImage: require('../../assets/images/default_profile.png'),
    }, //8
  ];

  const userPosts = [
    {
      firstName: 'Allison',
      lastName: 'Becker',
      location: 'Boston, MA',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 1201,
      comments: 24,
      bookmarks: 6,
      id: 1,
    },
    {
      firstName: 'Baker',
      lastName: 'Lancaster',
      location: 'Florida, FL',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 101,
      comments: 21,
      bookmarks: 8,
      id: 2,
    },
    {
      firstName: 'Bourne',
      lastName: 'Pierre',
      location: 'P-au-P, HT',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 300,
      comments: 48,
      bookmarks: 3,
      id: 3,
    },
    {
      firstName: 'Jackson',
      lastName: 'Curtis',
      location: 'Brooklyn, NY',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 300,
      comments: 34,
      bookmarks: 60,
      id: 4,
    },
    {
      firstName: 'Trader',
      lastName: 'Savvy',
      location: 'The Wharf, D.C.',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 3000,
      comments: 758,
      bookmarks: 3,
      id: 5,
    },
    {
      firstName: 'Jackon',
      lastName: 'Michael',
      location: 'Bowie, MD',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 321,
      comments: 21,
      bookmarks: 8,
      id: 6,
    },
    {
      firstName: 'World',
      lastName: 'Disney',
      location: 'Orlando, FL',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 2000,
      comments: 1245,
      bookmarks: 98,
      id: 7,
    },
    {
      firstName: 'Seraphin',
      lastName: 'Michel',
      location: 'Cap-Haitien, HT',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 453,
      comments: 18,
      bookmarks: 1,
      id: 8,
    },
    {
      firstName: 'Django',
      lastName: 'Bolado',
      location: 'San Diego, CA',
      profileImage: require('../../assets/images/default_profile.png'),
      image: require('../../assets/images/default_post.png'),
      likes: 53,
      comments: 12,
      bookmarks: 21,
      id: 9,
    },
  ];

  // Infinite Scroll Implementation, 4 stories per page/fetch.
  const userPostsPageSize = 4; //how many elements to load
  const [userPostsCurrentPage, setUserPostsCurrentPage] = useState(1); //which page are we in as we fetching user stories
  const [userPostsRenderData, setUserPostsRenderData] = useState([]); //How many items are available to the user right now
  const [isLoadingUserPosts, setIsLoadingUserPosts] = useState(false); // check if some user stories are already loading.

  // Infinite Scroll Implementation, 4 stories per page/fetch.
  const userStoriesPageSize = 4; //how many elements to load
  const [userStoriesCurrentPage, setUserStoriesCurrentPage] = useState(1); //which page are we in as we fetching user stories
  const [userStoriesRenderData, setUserStoriesRenderData] = useState([]); //How many items are available to the user right now
  const [isLoadingUserStories, setIsLoadingUserStories] = useState(false); // check if some user stories are already loading.

  const [screenData, setScreenData] = useState(Dimensions.get('screen'));
  console.log(screenData);
  // Function that's gong to populate the user stories into userStoriesRenderData.
  const pagination = (database, currentPage, pageSize) => {
    // Index to know in which do we need to start fetching data from the database.
    console.log('currentPage', currentPage);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    if (startIndex >= database.length) {
      return [];
    }
    return database.slice(startIndex, endIndex);
  };
  // useEffect fo set isLoadingUserStories to true when new elements are fetched.
  useEffect(() => {
    setIsLoadingUserStories(true);
    // Load the next 4 elements using the pagination function.
    const getInitialData = pagination(userStories, 1, userStoriesPageSize);
    // pass getInitialData into setUserStoriesRenderData state.
    setUserStoriesRenderData(getInitialData);
    setIsLoadingUserStories(false);

    // UseEffect action for userPosts
    setIsLoadingUserPosts(true);
    // Load the next 4 elements using the pagination function.
    const getInitialDataPosts = pagination(userPosts, 1, userPostsPageSize);
    // pass getInitialData into setUserStoriesRenderData state.
    setUserPostsRenderData(getInitialDataPosts);
    setIsLoadingUserPosts(false);

    Dimensions.addEventListener('change', result => {
      setScreenData(result.screen);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyle.backgroundWhite}>
      <View>
        <FlatList
          ListHeaderComponent={
            <>
              <View style={style.header}>
                <Title title={"Let's Explore"} />
                <TouchableOpacity style={style.messageIcon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    size={scaleFontSize(20)}
                    color={'#898DAE'}
                  />
                  <View style={style.messageNumberContainer}>
                    <Text style={style.messageNumber}>3</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={style.userStoryContainer}>
                <FlatList
                  onEndReachedThreshold={0.5} // everytime we slide through 2 out of the 4 elements (50%)
                  onEndReached={() => {
                    if (isLoadingUserStories) {
                      return;
                    } //if fetching is not loading, to not do anything.
                    setIsLoadingUserStories(true);
                    const contentToAppend = pagination(
                      userStories,
                      userStoriesCurrentPage + 1,
                      userStoriesPageSize,
                    );
                    if (contentToAppend.length > 0) {
                      setUserStoriesCurrentPage(userStoriesCurrentPage + 1);
                      setUserStoriesRenderData(prev => [
                        ...prev,
                        ...contentToAppend,
                      ]);
                    }
                    setIsLoadingUserStories(false);
                  }} // It means every time you can see 50% (2) of the rendered items (4) as you're scrolling, you reach the end, you can update this function to fetch for osme more.
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  data={userStoriesRenderData}
                  renderItem={({item}) => (
                    <UserStory
                      key={'userStory' + item.id}
                      firstName={item.firstName}
                      profileImage={item.profileImage}
                    />
                  )}
                />
              </View>
            </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (isLoadingUserPosts) {
              return;
            } //if fetching is not loading, to not do anything.
            setIsLoadingUserPosts(true);
            console.log('Fetching More data for you', userPostsCurrentPage + 1);
            const contentToAppendPosts = pagination(
              userPosts,
              userPostsCurrentPage + 1,
              userPostsPageSize,
            );
            if (contentToAppendPosts.length > 0) {
              setUserPostsCurrentPage(userPostsCurrentPage + 1);
              setUserPostsRenderData(prev => [
                ...prev,
                ...contentToAppendPosts,
              ]);
            }
            setIsLoadingUserPosts(false);
          }}
          data={userPostsRenderData}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={style.userPostContainer}>
              <UserPost
                key={'UserPost' + item.id}
                firstName={item.firstName}
                lastName={item.lastName}
                location={item.location}
                profileImage={item.profileImage}
                image={item.image}
                likes={item.likes}
                comments={item.comments}
                bookmarks={item.bookmarks}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
