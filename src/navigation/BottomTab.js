import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

// Pantallas de navegación
import HomeScreen from '../screens/HomeScreen';
import RegistarScreen from '../screens/RegistrarScreen';
import VerScreen from '../screens/VerScreen';

// Navegador Bottom Tabs Navigator
const Tab = createBottomTabNavigator();

export default function BottomTab({ logueado, setLogueado }) {
  // Función para renderizar HomeScreen con props
  const renderHomeScreen = props => (
    <HomeScreen {...props} setLogueado={setLogueado} logueado={logueado} />
  );

  // Función para renderizar LoginScreen con props (si es necesario)
  const renderLoginScreen = props => (
    <RegistarScreen {...props} setLogueado={setLogueado} logueado={logueado} />
  );
  const renderVerScreen = props => (
    <VerScreen {...props} setLogueado={setLogueado} logueado={logueado} />
  );

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={renderHomeScreen}
        options={{
          title: 'Inicio',
          tabBarActiveTintColor: '#FFC300',
          headerStyle: {
            backgroundColor: '#FFC300',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="VerScreen"
        component={renderVerScreen}
        options={{
          title: 'Listado de Usuarios',
          tabBarActiveTintColor: '#FF5733',
          headerStyle: {
            backgroundColor: '#FF5733',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="RegistarScreen"
        component={renderLoginScreen}
        options={{
          title: 'Registrar administradores',
          tabBarActiveTintColor: '#FF5733',
          headerStyle: {
            backgroundColor: '#FF5733',
          },
          headerTintColor: '#fff',
          tabBarIcon: ({ color }) => (
            <Ionicons name="log-in" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
