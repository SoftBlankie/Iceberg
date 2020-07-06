package com.japanpanda.iceberg.retrofit.auth_interface

import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("/api/user/login")
    fun loginUser(
        @Body params: RequestBody
    ): Call<LoginResponse>

    @POST("/api/user/signup")
    fun signupUser(
        @Body params: RequestBody
    ): Call<SignupResponse>
}