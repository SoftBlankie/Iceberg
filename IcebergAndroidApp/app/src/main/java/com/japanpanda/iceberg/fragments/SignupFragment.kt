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
import com.japanpanda.iceberg.databinding.FragmentSignupBinding
import com.japanpanda.iceberg.retrofit.RetrofitInstance
import com.japanpanda.iceberg.retrofit.auth_interface.AuthService
import com.japanpanda.iceberg.retrofit.auth_interface.SignupResponse
import okhttp3.RequestBody
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response


class SignupFragment : Fragment() {

    // TODO: Add parameter validation and error messages
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentSignupBinding>(
            inflater,
            R.layout.fragment_signup, container, false
        )

        binding.signupButton.setOnClickListener { view: View ->

            signUpUser(
                binding.usernameEntry.text.toString(),
                binding.passwordEntry.text.toString(),
                binding.emailEntry.text.toString()
            )
        }


        return binding.root
    }

    private fun signUpUser(username: String, password: String, email: String) {
        Log.d("Attempt to Sign Up", "user: $username pass: $password email: $email")
        val retrofit = RetrofitInstance.getRetrofitInstance()

        val service = retrofit!!.create(AuthService::class.java)

        val jsonParams = mutableMapOf<String, Any>()
        jsonParams["username"] = username
        jsonParams["password"] = password
        jsonParams["email"] = email

        val body = RequestBody.create(
            okhttp3.MediaType.parse("application/json; charset=utf-8"),
            Gson().toJson(jsonParams)
        )

        val call = service.signupUser(body)

        call.enqueue(object : Callback<SignupResponse> {
            override fun onResponse(
                call: Call<SignupResponse>,
                response: Response<SignupResponse>
            ) {
                if (response.isSuccessful) {
                    Log.d("Response received", response.body()!!.username!!)
                }
            }

            override fun onFailure(call: Call<SignupResponse>, t: Throwable) {
                Toast.makeText(requireActivity(), "${t.message}", Toast.LENGTH_SHORT).show()
            }


        })
    }
}