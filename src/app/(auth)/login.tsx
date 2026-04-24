import React, { useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	StatusBar,
	Animated,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/validation/loginSchema";
import { FormInput } from "@/components/common/FormInput";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { Colors } from "@/constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";



export default function LoginScreen() {
	const router = useRouter();
	const shakeAnim = useRef(new Animated.Value(0)).current;

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
		mode: "onChange",
	});

	const triggerShake = () => {
		Animated.sequence([
			Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true }),
			Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
		]).start();
	};

	const onSubmit = async (_data: LoginFormValues) => {
		router.replace("/(main)/borrow");
	};

	const onError = () => {
		triggerShake();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="light-content" backgroundColor="#7357F5" />

			<KeyboardAvoidingView
				style={styles.flex}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={styles.brandSection}>
						<Text style={styles.brandName}>Lenme</Text>
						<Text style={styles.tagline}>Smart borrowing, simplified.</Text>
					</View>

					<Animated.View
						style={[styles.card, { transform: [{ translateX: shakeAnim }] }]}
					>
						<Text style={styles.cardTitle}>Welcome back</Text>
						<Text style={styles.cardSubtitle}>Sign in to your account</Text>

						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
								<FormInput
									label="Email address"
									placeholder="test@gmail.com"
									keyboardType="email-address"
									autoComplete="email"
									value={value}
									onChangeText={onChange}
									error={errors.email?.message}
								/>
							)}
						/>

						<Controller
							control={control}
							name="password"
							render={({ field: { onChange,value } }) => (
								<FormInput
									label="Password"
									placeholder="Enter Your Password"
									isPassword
									autoComplete="password"
									value={value}
									onChangeText={onChange}
									error={errors.password?.message}
								/>
							)}
						/>

						<PrimaryButton
							label="Sign In"
							onPress={handleSubmit(onSubmit, onError)}
							loading={isSubmitting}
							style={styles.submitBtn}
						/>


					</Animated.View>

				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
	flex: { flex: 1 },
	safeArea: {
		flex: 1,
		backgroundColor: "#7357F5",
	},
	scrollContent: {
		flexGrow: 1,
		paddingBottom: 32,
	},
	brandSection: {
		alignItems: "center",
		paddingTop: 52,
		paddingBottom: 32,
	},
	brandName: {
		fontSize: 28,
		fontWeight: "800",
		color: Colors.white,
		letterSpacing: 1,
	},
	tagline: {
		fontSize: 13,
		color: "rgba(255,255,255,0.7)",
		marginTop: 4,
		fontWeight: "400",
	},
	card: {
		backgroundColor: Colors.white,
		marginHorizontal: 20,
		borderRadius: 24,
		padding: 24,
		shadowColor: "#1a0a4d",
		shadowOffset: { width: 0, height: 12 },
		shadowOpacity: 0.18,
		shadowRadius: 24,
		elevation: 12,
	},
	cardTitle: {
		fontSize: 22,
		fontWeight: "800",
		color: Colors.dark,
		marginBottom: 4,
	},
	cardSubtitle: {
		fontSize: 13,
		color: Colors.grey_600,
		marginBottom: 24,
		fontWeight: "400",
	},
	submitBtn: {
		marginTop: 4,
	},
});