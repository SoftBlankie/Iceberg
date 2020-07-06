package com.japanpanda.iceberg.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.google.gson.Gson
import com.japanpanda.iceberg.R
import com.japanpanda.iceberg.databinding.FragmentLoginBinding
import com.japanpanda.iceberg.retrofit.RetrofitInstance
import com.japanpanda.iceberg.retrofit.auth_interface.AuthService
import com.japanpanda.iceberg.retrofit.auth_interface.LoginResponse
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentLoginBinding>(
            inflater,
            R.layout.fragment_login, container, false
        )

        binding.loginButton.setOnClickListener { view: View ->

            loginUser(
                binding.usernameEntry.text.toString(),
                binding.passwordEntry.text.toString()
            )
        }


        return binding.root
    }

    private fun loginUser(username: String, password: String) {
        Log.d("Attempt to log in", "user: $username pass: $password")
        val retrofit = RetrofitInstance.getRetrofitInstance()

        val service = retrofit!!.create(AuthService::class.java)

        val jsonParams = mutableMapOf<String, Any>()
        jsonParams["username"] = username
        jsonParams["password"] = password

        val body = RequestBody.create(
            okhttp3.MediaType.parse("application/json; charset=utf-8"),
            Gson().toJson(jsonParams)
        )

        val call = service.loginUser(body)

        call.enqueue(object : Callback<LoginResponse> {
            override fun onResponse(
                call: Call<LoginResponse>,
                response: Response<LoginResponse>
            ) {
                if (response.isSuccessful) {
                    Log.d("Response received", response.body()!!.token!!)
                }
            }

            override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
                Toast.makeText(requireActivity(), "${t.message}", Toast.LENGTH_SHORT).show()
            }


        })
    }
}