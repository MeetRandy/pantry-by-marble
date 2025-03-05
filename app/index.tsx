import Divider from '@/components/ui/Divider';
import DividerWithText from '@/components/ui/DividerWithText';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, router } from 'expo-router';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm, Controller } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email format'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  phoneNumber: yup.string().required('Phone number is required'),
  fullName: yup.string().required('Full name is required'),
});

export default function index() {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log('Submitting registration data:', data);
    router.push('/(tabs)' as any);
  };

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    console.log(errors);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.topContainer}>
          <View style={styles.column75}>
            <Text style={styles.title}>Welcome to Pantry by Marble</Text>
          </View>
          <TouchableOpacity onPress={methods.handleSubmit(onSubmit, onError)}  style={styles.column25}>
            <Text style={[styles.explore, { fontFamily: 'Avenir' }]}>Explore app</Text>
          </TouchableOpacity>
          <View style={styles.column75}>
            <Text style={[styles.tagline, { fontFamily: 'Avenir' }]}>
              Sign up for easy payment, collection and much more
            </Text>
          </View>
        </View>

        <Divider />

        <FormProvider {...methods}>
          <View style={styles.form}>
            <Controller
              control={methods.control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Full name"
                  mode="flat"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  underlineColor="#54634B"
                  activeUnderlineColor="#54634B"
                  cursorColor="#54634B"
                  selectionColor="#54634B"
                  autoCapitalize="words"
                  returnKeyType="next"
                  style={styles.input}
                  contentStyle={styles.inputContent}
                  error={!!methods.formState.errors.fullName}
                  right={value ? (
                    <TextInput.Icon icon="close-circle" onPress={() => methods.setValue('fullName', '')} color="#54634B" />
                  ) : null}
                />
              )}
            />
            {methods.formState.errors.fullName && <Text style={styles.error}>{methods.formState.errors.fullName.message}</Text>}

            <Controller
              control={methods.control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  mode="flat"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  underlineColor="#54634B"
                  activeUnderlineColor="#54634B"
                  cursorColor="#54634B"
                  selectionColor="#54634B"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  style={styles.input}
                  contentStyle={styles.inputContent}
                  error={!!methods.formState.errors.email}
                  right={value ? (
                    <TextInput.Icon icon="close-circle" onPress={() => methods.setValue('email', '')} color="#54634B" />
                  ) : null}
                />
              )}
            />
            {methods.formState.errors.email && <Text style={styles.error}>{methods.formState.errors.email.message}</Text>}

            <Controller
              control={methods.control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Phone Number"
                  mode="flat"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                  left={<TextInput.Affix text="+27 | " textStyle={styles.affixText} />}
                  underlineColor="#54634B"
                  activeUnderlineColor="#54634B"
                  cursorColor="#54634B"
                  selectionColor="#54634B"
                  style={styles.input}
                  contentStyle={styles.inputContent}
                  error={!!methods.formState.errors.phoneNumber}
                  right={value ? (
                    <TextInput.Icon icon="close-circle" onPress={() => methods.setValue('phoneNumber', '')} color="#54634B" />
                  ) : null}
                />
              )}
            />
            {methods.formState.errors.phoneNumber && <Text style={styles.error}>{methods.formState.errors.phoneNumber.message}</Text>}

            <Controller
              control={methods.control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  mode="flat"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  underlineColor="#54634B"
                  activeUnderlineColor="#54634B"
                  cursorColor="#54634B"
                  selectionColor="#54634B"
                  secureTextEntry
                  returnKeyType="done"
                  style={styles.input}
                  contentStyle={styles.inputContent}
                  error={!!methods.formState.errors.password}
                  right={value ? (
                    <TextInput.Icon icon="close-circle" onPress={() => methods.setValue('password', '')} color="#54634B" />
                  ) : null}
                />
              )}
            />
            {methods.formState.errors.password && <Text style={styles.error}>{methods.formState.errors.password.message}</Text>}

            <Button
              textColor="#fff"
              style={styles.button}
              labelStyle={styles.buttonLabel}
              mode="contained"
              onPress={methods.handleSubmit(onSubmit, onError)}
              disabled={!methods.formState.isValid}
            >
              Sign Up
            </Button>
          </View>
        </FormProvider>

        <Text style={styles.accountType}>
          Have an account? <Link href="/" style={styles.link}>Login</Link>
        </Text>

        <DividerWithText text="or" />

        <Button
          textColor="#fff"
          style={styles.button}
          labelStyle={styles.buttonLabel}
          mode="contained"
          onPress={methods.handleSubmit(onSubmit, onError)}
          disabled={!methods.formState.isValid}
        >
          Explore our app
        </Button>

        <Text style={styles.terms}>
          By signing up you agree to our{" "}
          <Text style={styles.link}>Terms</Text>,{" "}
          <Text style={styles.link}>Data Policy</Text>, and{" "}
          <Text style={styles.link}>Cookies Policy</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white' },
  topContainer: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start' },
  column75: { width: '80%' },
  column25: { width: '20%' },
  title: { fontFamily: 'AGaramondProBoldItalic', fontSize: 40, color: '#54634B' },
  tagline: { fontFamily: 'Avenir', fontSize: 16, color: '#54634B' },
  form: { marginBottom: 20 },
  input: { marginBottom: 8, backgroundColor: 'transparent' },
  inputContent: { fontFamily: 'AGaramondProBoldItalic', color: '#54634B', fontSize: 18, marginTop: 5 },
  error: { color: 'red', marginBottom: 8 },
  button: { marginTop: 40, backgroundColor: '#54634B' },
  buttonLabel: { fontFamily: 'Avenir', fontSize: 14, color: '#fff' },
  terms: { textAlign: 'center', fontSize: 14, color: '#666', marginTop: 24 },
  link: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  affixText: { fontSize: 18, fontFamily: "AGaramondProBoldItalic", color: "#54634B"},
  accountType: { textAlign: 'center', marginTop: 24, fontFamily: 'Avenir', fontSize: 14, lineHeight: 20, color: '#54634B'},
  explore: { textAlign: 'left', fontFamily: 'Avenir', fontSize: 12, lineHeight: 20, color: '#54634B'},
});

