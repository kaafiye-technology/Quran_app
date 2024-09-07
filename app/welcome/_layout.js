import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="welcome"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? 'home' : 'home'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name={focused ? 'login' : 'login'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      
    </Tabs>
  );
}
