import React, { useRef, useState } from "react";
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
import { useAuth } from "@/context/AuthContext";

const MOCK_USER = {
	email: "demo@lenme.com",
	password: "password123",
};

export default function LoginScreen() {
	const [authError, setAuthError] = useState<string | null>(null);
	const { login } = useAuth();
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

	const onSubmit = async (data: LoginFormValues) => {
		setAuthError(null);

		// Validate against mock credentials
		if (
			data.email.toLowerCase() !== MOCK_USER.email.toLowerCase() ||
			data.password !== MOCK_USER.password
		) {
			setAuthError("Invalid email or password. Please try again.");
			triggerShake();
			return;
		}

		const token = data.email;
		await login(token);
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
						<View style={styles.hintBox}>
							<Text style={styles.hintTitle}>🔑 Test Credentials</Text>
							<Text style={styles.hintText}>Email: {MOCK_USER.email}</Text>
							<Text style={styles.hintText}>Password: {MOCK_USER.password}</Text>
						</View>
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
							render={({ field: { onChange, value } }) => (
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
						{authError && (
							<View style={styles.errorBanner}>
								<Text style={styles.errorBannerText}>❌ {authError}</Text>
							</View>
						)}
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

const styles = StyleSheet.create({
	flex: { flex: 1 },
	safeArea: { flex: 1, backgroundColor: "#7357F5" },
	scrollContent: { flexGrow: 1, paddingBottom: 32 },
	brandSection: { alignItems: "center", paddingTop: 52, paddingBottom: 32 },
	brandName: {
		fontSize: 28, fontWeight: "800", color: Colors.white, letterSpacing: 1,
	},
	tagline: {
		fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 4, fontWeight: "400",
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
	cardTitle: { fontSize: 22, fontWeight: "800", color: Colors.dark, marginBottom: 4 },
	cardSubtitle: {
		fontSize: 13, color: Colors.grey_600, marginBottom: 16, fontWeight: "400",
	},

	// Hint box
	hintBox: {
		backgroundColor: "#f0edff",
		borderColor: "#c4b8fc",
		borderWidth: 1,
		borderRadius: 10,
		padding: 12,
		marginBottom: 20,
	},
	hintTitle: {
		fontSize: 12, fontWeight: "700", color: "#5b3fd4", marginBottom: 4,
	},
	hintText: { fontSize: 12, color: "#5b3fd4", lineHeight: 18 },

	errorBanner: {
		backgroundColor: "#fff0f0",
		borderColor: "#ffb3b3",
		borderWidth: 1,
		borderRadius: 8,
		padding: 10,
		marginTop: 8,
		marginBottom: 4,
	},
	errorBannerText: { fontSize: 13, color: "#e53935", fontWeight: "500" },

	submitBtn: { marginTop: 12 },
});