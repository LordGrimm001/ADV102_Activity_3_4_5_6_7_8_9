import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../firebase/AuthContext';

export default function FirebaseAuth() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/firebaseAuth');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FF9800', '#F57C00', '#E65100']}
        style={styles.headerGradient}
      >
        <View style={styles.headerContent}>
          <Ionicons name="flame" size={60} color="white" />
          <Text style={styles.headerText}>Firebase Integration</Text>
          <Text style={styles.subHeaderText}>
            Authentication & Storage
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {currentUser ? (
          <View style={styles.userInfoContainer}>
            <Text style={styles.welcomeText}>Welcome, {currentUser.displayName || 'User'}!</Text>
            
            <View style={styles.profileContainer}>
              {currentUser.photoURL ? (
                <Image 
                  source={{ uri: currentUser.photoURL }} 
                  style={styles.profileImage} 
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Ionicons name="person" size={40} color="#FF9800" />
                </View>
              )}
              
              <View style={styles.userDetails}>
                <Text style={styles.userEmail}>{currentUser.email}</Text>
                <Text style={styles.userId}>User ID: {currentUser.uid.substring(0, 8)}...</Text>
              </View>
            </View>
            
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/firebaseAuth/profile')}
            >
              <Text style={styles.profileButtonText}>View Profile</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.description}>
              This exercise demonstrates Firebase integration with React Native:
            </Text>
            
            <View style={styles.featureContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="person-add" size={24} color="#FF9800" style={styles.featureIcon} />
                <View>
                  <Text style={styles.featureTitle}>User Authentication</Text>
                  <Text style={styles.featureDescription}>
                    Register and login with Firebase Authentication
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="cloud-upload" size={24} color="#FF9800" style={styles.featureIcon} />
                <View>
                  <Text style={styles.featureTitle}>Image Storage</Text>
                  <Text style={styles.featureDescription}>
                    Upload profile images to Firebase Storage
                  </Text>
                </View>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={24} color="#FF9800" style={styles.featureIcon} />
                <View>
                  <Text style={styles.featureTitle}>Secure Authentication</Text>
                  <Text style={styles.featureDescription}>
                    Email and password validation with Firebase security
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => router.push('/firebaseAuth/login')}
              >
                <Ionicons name="log-in" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => router.push('/firebaseAuth/register')}
              >
                <Ionicons name="person-add" size={20} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  headerGradient: {
    paddingVertical: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 25,
    elevation: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: '#FF9800',
  },
  registerButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profilePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f1f1f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userDetails: {
    flex: 1,
  },
  userEmail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  userId: {
    fontSize: 14,
    color: '#666',
  },
  profileButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});