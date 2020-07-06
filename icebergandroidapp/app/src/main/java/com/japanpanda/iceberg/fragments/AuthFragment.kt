package com.japanpanda.iceberg.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import com.japanpanda.iceberg.R
import com.japanpanda.iceberg.databinding.FragmentAuthBinding


class AuthFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        val binding = DataBindingUtil.inflate<FragmentAuthBinding>(
            inflater,
            R.layout.fragment_auth, container, false
        )

        binding.loginButton.setOnClickListener { view: View ->
            view.findNavController().navigate(R.id.action_authFragment_to_loginFragment)
        }

        binding.signupButton.setOnClickListener { view: View ->
            view.findNavController().navigate(R.id.action_authFragment_to_signupFragment)
        }

        return binding.root
    }


}