import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../firebase/AuthContext';

export default function UserProfile() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    router.replace('/firebaseAuth');
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/firebaseAuth');
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#FF9800', '#F57C00', '#E65100']}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          {currentUser.photoURL ? (
            <Image 
              source={{ uri: currentUser.photoURL }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Ionicons name="person" size={60} color="#FF9800" />
            </View>
          )}
          <Text style={styles.userName}>{currentUser.displayName || 'User'}</Text>
          <Text style={styles.userEmail}>{currentUser.email}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>Account Information</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="person" size={24} color="#FF9800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{currentUser.displayName || 'Not set'}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="mail" size={24} color="#FF9800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{currentUser.email}</Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="calendar" size={24} color="#FF9800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Account Created</Text>
              <Text style={styles.infoValue}>
                {currentUser.metadata?.creationTime 
                  ? new Date(currentUser.metadata.creationTime).toLocaleDateString() 
                  : 'Unknown'}
              </Text>
            </View>
          </View>
          
          <View style={styles.infoItem}>
            <Ionicons name="shield-checkmark" size={24} color="#FF9800" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Verified</Text>
              <Text style={styles.infoValue}>
                {currentUser.emailVerified ? 'Yes' : 'No'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="create-outline" size={20} color="#FF9800" />
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="key-outline" size={20} color="#FF9800" />
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={20} color="#fff" />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
  profileHeader: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 15,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoIcon: {
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginTop: 10,
    borderBottomWidth: 0,
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white',
    marginLeft: 15,
    fontWeight: '500',
  },
});