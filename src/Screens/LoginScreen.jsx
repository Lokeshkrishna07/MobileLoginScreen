import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'; // <-- Alert imported
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isDobValid, setIsDobValid] = useState(false);
  const SIGNATURE_IMAGE = require('../assets/vector-illustration-isolated-white-background-login-button-icon-126999949.webp');

  const validateUsername = (name) => {
    const usernameRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Z]\S{5,}$/; 
    return usernameRegex.test(name);
  };

  const validateDob = (date) => {
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/; 
    return dobRegex.test(date);
  };

  useEffect(() => {
    setIsUsernameValid(validateUsername(username));
  }, [username]);

  useEffect(() => {
    setIsDobValid(validateDob(dob));
  }, [dob]);

  const isButtonEnabled = isUsernameValid && isDobValid && agreed;

  const handleLogin = () => {
    if (isButtonEnabled) {
      console.log('Username:', username);
      console.log('Date of Birth:', dob);
      Alert.alert('Authorized!', 'Proceeding with login...');
    } else {
      Alert.alert('Validation Error', 'Please ensure all fields are correct and terms are agreed upon.');
    }
  };

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <View style={styles.container}>

        {/* sub container1 */}
        <View style={styles.sub1}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Please Login </Text>
        </View>

        {/* sub container2 */}
        <View style={styles.sub2}>
          
          <Image
            source={SIGNATURE_IMAGE} 
            style={styles.signatureImage}
            resizeMode="contain"
          />

          {/*Input Container - Username */}
          <View style={[styles.inputContainer, !isUsernameValid && username.length > 0 && styles.inputErrorBorder]}>
              {/* Icon */}
              <View style={styles.iconCircle}>
                <Icon 
                  name="envelope-o"
                  size={20}
                  color="#FFFFFF"
                  style={styles.centeredIcon}
                />
              </View>
            <TextInput
              style={styles.input}
              placeholder="User Name"
              placeholderTextColor="#ADADAD"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {/* Validation Feedback for Username */}
          {!isUsernameValid && username.length > 0 && (
            <Text style={styles.errorText}>
              Username must start with a capital, be at least 6 chars, contain a number/special char, and have no spaces.
            </Text>
          )}

          {/* Input Container - DOB */}
          <View style={[styles.inputContainer, !isDobValid && dob.length > 0 && styles.inputErrorBorder]}>
            {/* Icon */}
            <View style={styles.iconCircle}>
                <Icon 
                  name="calendar"
                  size={20}
                  color="#FFFFFF"
                  style={styles.centeredIcon}
                />
              </View>

            <TextInput
              style={styles.input}
              placeholder="Date of Birth (MM/DD/YYYY)"
              placeholderTextColor="rgba(173, 173, 173, 1)"
              value={dob}
              onChangeText={setDob}
              keyboardType="numeric"
              maxLength={10} 
              autoCorrect={false}
            />
          </View>

          {/* Validation Feedback for DOB */}
          {!isDobValid && dob.length > 0 && (
            <Text style={styles.errorText}>
              Date of Birth must be in MM/DD/YYYY format.
            </Text>
          )}          
          
          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, agreed && styles.checkboxChecked]}
              onPress={() => setAgreed(!agreed)}
            >
              {/* Added Icon for visual check */}
              {agreed && <Icon name="check" size={12} color="#FFFFFF" />}
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I have reviewed and agree to the terms of the 
              <Text style={styles.linkText}> Disclosure and Consent to Electronic Communications </Text> 
              and 
              <Text style={styles.linkText}> Terms of Service</Text>
              . I also confirm that I have received the 
              <Text style={styles.linkText}> Privacy Policy</Text>
              .
            </Text>
          </View>

          {/* Authorise Button */}
          <TouchableOpacity 
            style={[styles.button, !isButtonEnabled && styles.buttonDisabled]} 
            onPress={handleLogin} 
            disabled={!isButtonEnabled}
          >
            <Text style={styles.buttonText}>AUTHORISE</Text>
          </TouchableOpacity>
        </View>
        
        {/* Footer */}
        <Text style={styles.footerText}>
            {"\u00A9"} Lokesh Krishna Koyya All rights reserved.
        </Text>
      </View>
    </ScrollView>
    
  );
};

export default LoginScreen;


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    flex: 1,
    minHeight: 891,
    paddingBottom: 20,
  },
  
  // SUB1 
  sub1: {
    height: 250, 
    backgroundColor: 'rgba(21, 113, 193, 1)',
    justifyContent: 'flex-end', 
    alignItems: 'flex-end',
    paddingBottom: 115,
  },
  title: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    marginBottom: 12,
    marginRight: 17
  },
  subtitle: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 17
  },

  // --- SUB2 
  sub2: {
    minHeight: 539, 
    backgroundColor: '#FFFFFF',
    borderColor: '#E6E6E6',

    marginHorizontal: 20,
    marginTop: -50, 
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, 
    shadowRadius: 6,  
    elevation: 8, 
    alignItems: 'center',
  },
  signatureImage: {
    height: 120, 
    width: '100%', 
    marginLeft: 86,
    marginRight: 64,
    marginBottom: 48,
    marginTop: 48
  },

  // Input Styles
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#428BCA',
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#428BCA',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2, //2
    opacity: 1,
    left: -3,
    top: -2,
  },

  inputErrorBorder: {
    borderColor: '#FF4C4C',
    borderWidth: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingBottom:0,
    fontSize: 16,
    color: '#000',
    letterSpacing: 0,
    fontWeight: '500',
    textAlign: 'left',
    paddingLeft : 35,
  },
  

  errorText: {
    color: '#FF4C4C',
    fontSize: 12,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 5,
    fontWeight: '500',
  },
  
  // --- Terms and Conditions Styles ---
  termsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginBottom: 30,
    paddingRight: 15,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#428BCA',
    marginRight: 10,
    backgroundColor: '#fff',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  checkboxChecked: {
    backgroundColor: '#1571C1',
    borderColor: '#1571C1',
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: '#000000',
    lineHeight: 18,
    opacity: 1,
  },
  linkText: {
    color: '#428BCA',
    fontWeight: '600',
    fontSize: 13,
  },

  // --- Button Styles ---
  button: {
    width: '100%',
    height: 49,
    backgroundColor: '#1571C1', 
    opacity: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  // ADDED BUTTON DISABLED STYLE
  buttonDisabled: {
    backgroundColor: 'rgba(21, 113, 193, 0.5)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  
  // --- Footer Styles ---
  footerText: {
    alignSelf: 'center',
    fontSize: 11,
    color: '#888888',
    marginTop: 10,
    opacity: 1,
    letterSpacing: 0,
  }
});










// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const LoginScreen = () => {
//   const [username, setUsername] = useState('');
//   const [dob, setDob] = useState('');
//   const [agreed, setAgreed] = useState(false);
//   const [isUsernameValid, setIsUsernameValid] = useState(false);
//   const [isDobValid, setIsDobValid] = useState(false);
//   const SIGNATURE_IMAGE = require('../assets/Frank_Sinatra_signature (1).jpg');

//   const validateUsername = (name) => {
//     const usernameRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Z]\S{5,}$/; 
//     return usernameRegex.test(name);
//   };

//   const validateDob = (date) => {
//     const dobRegex = /^\d{10}$/; 
//     return dobRegex.test(date);
//   };

//   useEffect(() => {
//     setIsUsernameValid(validateUsername(username));
//   }, [username]);

//   useEffect(() => {
//     setIsDobValid(validateDob(dob));
//   }, [dob]);

//   const isButtonEnabled = isUsernameValid && isDobValid && agreed;

// const handleLogin = () => {
//     if (isButtonEnabled) {
//       console.log('Username:', username);
//       console.log('Date of Birth:', dob);
//       Alert.alert('Authorized!', 'Proceeding with login...');
//     } else {
//       Alert.alert('Validation Error', 'Please ensure all fields are correct and terms are agreed upon.');
//     }
//   };

//   return (

//     <ScrollView contentContainerStyle={styles.scrollContainer}>

//       <View style={styles.container}>

//         {/* sub container1 */}
//         <View style={styles.sub1}>
//           <Text style={styles.title}>Welcome Back!</Text>
//           <Text style={styles.subtitle}>Sooraj E-Signature</Text>
//         </View>

//         {/* sub container2 */}
//         <View style={styles.sub2}>
          
//           <Image
//             source={SIGNATURE_IMAGE} 
//             style={styles.signatureImage}
//             resizeMode="contain"
//           />

//           {/*Input Container */}
//           <View style={[styles.inputContainer, !isUsernameValid && username.length > 0 && styles.inputErrorBorder]}>
//             {/* Icon */}
//               <View style={styles.iconCircle}>
//                 <Icon 
//                   name="envelope-o"
//                   size={20}
//                   color="#FFFFFF"
//                   style={styles.centeredIcon}
//                 />
//               </View>
//             <TextInput
//               style={styles.input}
//               placeholder="User Name"
//               placeholderTextColor="#ADADAD"
//               value={username}
//               onChangeText={setUsername}
//               autoCapitalize="none"
//             />
//           </View>
//           {/* Validation Feedback for Username */}
//           {!isUsernameValid && username.length > 0 && (
//             <Text style={styles.errorText}>
//               Username must start with a capital, be at least 6 chars, contain a number/special char, and have no spaces.
//             </Text>
//           )}

//           <View style={[styles.inputContainer, !isDobValid && dob.length > 0 && styles.inputErrorBorder]}>
//             {/* Icon */}
//             <View style={styles.iconCircle}>
//                 <Icon 
//                   name="lock"
//                   size={20}
//                   color="#FFFFFF"
//                   style={styles.centeredIcon}
//                 />
//               </View>

//             <TextInput
//               style={styles.input}
//               placeholder="Date of Birth (MMDDYYYY)"
//               placeholderTextColor="rgba(173, 173, 173, 1)"
//               value={dob}
//               onChangeText={setDob}
//               keyboardType="numeric"
//               maxLength={10}
//             />
//           </View>

//           {/* Validation Feedback for DOB */}
//           {!isDobValid && dob.length > 0 && (
//             <Text style={styles.errorText}>
//               Date of Birth must be in MMDDYYYY format (8 digits).
//             </Text>
//           )}          
          
//           {/* Terms and Conditions */}
//           <View style={styles.termsContainer}>
//             <TouchableOpacity 
//               style={[styles.checkbox, agreed && styles.checkboxChecked]}
//               onPress={() => setAgreed(!agreed)}
//             />
//             <Text style={styles.termsText}>
//               I have reviewed and agree to the terms of the 
//               <Text style={styles.linkText}> Disclosure and Consent to Electronic Communications </Text> 
//               and 
//               <Text style={styles.linkText}> Terms of Service</Text>
//               . I also confirm that I have received the 
//               <Text style={styles.linkText}> Privacy Policy</Text>
//               .
//             </Text>
//           </View>

//           {/* Authorise Button */}
//           <TouchableOpacity style={[styles.button, !isButtonEnabled && styles.buttonDisabled]} onPress={handleLogin} disabled={!agreed}>
//             <Text style={styles.buttonText}>AUTHORISE</Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Footer */}
//         <Text style={styles.footerText}>
//             © 2025 IntelliRose. All rights reserved.
//         </Text>
//       </View>
//     </ScrollView>
    
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     backgroundColor: '#F7F7F7',
//   },
//   container: {
//     flex: 1,
//     minHeight: 891,
//     paddingBottom: 20,
//   },
  
//   // SUB1 
//   sub1: {
//     height: 250, 
//     backgroundColor: 'rgba(21, 113, 193, 1)',
//     justifyContent: 'flex-end', 
//     alignItems: 'flex-end',
//     paddingBottom: 115,
//   },
//   title: {
//     fontSize: 20,
//     color: 'rgba(255, 255, 255, 1)',
//     fontWeight: 'bold',
//     marginBottom: 12,
//     marginRight: 17
//   },
//   subtitle: {
//     fontSize: 30,
//     color: '#FFFFFF',
//     fontWeight: 'bold',
//     marginRight: 17
//   },

//   // --- SUB2 
//   sub2: {
//     minHeight: 539, 
//     backgroundColor: '#FFFFFF',
//     borderColor: '#E6E6E6',

//     marginHorizontal: 20,
//     marginTop: -50, 
//     borderRadius: 20,
//     padding: 25,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1, 
//     shadowRadius: 6,  
//     elevation: 8, 
//     alignItems: 'center',
//   },
//   signatureImage: {
//     height: 69, 
//     width: 242, 
//     marginLeft: 86,
//     marginRight: 64,
//     marginBottom: 48,
//     marginTop: 48
//   },

//   // Input Styles
//   inputContainer: {
//     position: 'relative',
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     height: 40,
//     borderWidth: 1,
//     borderColor: '#428BCA',
//     borderRadius: 20,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//   },
//   iconCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#428BCA',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'absolute',
//     zIndex: 2,
//     opacity: 1,
//     left: 0,
//     top: 0,
//   },
//   inputErrorBorder: {
//     borderColor: '#FF4C4C',
//     borderWidth: 2,
//   },
//   input: {
//     flex: 1,
//     lineHeight: 23,
//     fontSize: 15,
//     color: '#000',
//     letterSpacing: 0,
//     fontWeight: '500',
//     textAlign: 'left',
//     paddingLeft : 36,
//   },
  
//   // --- Terms and Conditions Styles ---
//   termsContainer: {
//     flexDirection: 'row',
//     alignSelf: 'flex-start',
//     marginBottom: 30,
//     paddingRight: 15,
//   },
//   checkbox: {
//     width: 18,
//     height: 18,
//     borderRadius: 2,
//     borderWidth: 1,
//     borderColor: '#428BCA',
//     marginRight: 10,
//     backgroundColor: '#fff',
//   },
//   checkboxChecked: {
//     backgroundColor: '#1571C1',
//     borderColor: '#1571C1',
//   },
//   termsText: {
//     flex: 1,
//     fontSize: 13,
//     color: '#000000',
//     lineHeight: 18,
//     opacity: 1,
//   },
//   linkText: {
//     color: '#428BCA',
//     fontWeight: '600',
//     fontSize: 13,
//   },

//   // --- Button Styles ---
//   button: {
//     width: '100%',
//     height: 49,
//     backgroundColor: '#1571C1', 
//     opacity: 1,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: 'bold',
//     letterSpacing: 0,
//   },
  
//   // --- Footer Styles ---
//   footerText: {
//     alignSelf: 'center',
//     fontSize: 11,
//     color: '#888888',
//     marginTop: 10,
//     opacity: 1,
//     letterSpacing: 0,
//   }
// });
