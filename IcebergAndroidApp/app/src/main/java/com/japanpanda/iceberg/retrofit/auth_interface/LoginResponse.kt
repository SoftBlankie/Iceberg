package com.japanpanda.iceberg.retrofit.auth_interface

import com.google.gson.annotations.SerializedName

class LoginResponse {
    @SerializedName("status")
    var status: Int? = null

    @SerializedName("username")
    var username: String? = null

    @SerializedName("token")
    var token: String? = null

    @SerializedName("error")
    var error: String? = null

}