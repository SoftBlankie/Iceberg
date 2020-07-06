package com.japanpanda.iceberg.retrofit.auth_interface

import com.google.gson.annotations.SerializedName

class SignupResponse {
    @SerializedName("status")
    var status: Int? = null

    @SerializedName("username")
    var username: String? = null

    @SerializedName("email")
    var email: String? = null

    @SerializedName("error")
    var error: String? = null
}