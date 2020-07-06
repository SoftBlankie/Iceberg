package com.japanpanda.iceberg.fragments

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.findNavController
import com.japanpanda.iceberg.R

class SplashFragment : Fragment() {

    private var isLoggedIn = false
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_splash, container, false)
    }

    override fun onStart() {
        super.onStart()
        if (!isLoggedIn) {
            view?.findNavController()?.navigate(R.id.action_splashFragment_to_authFragment)
        } else {
            view?.findNavController()?.navigate(R.id.action_splashFragment_to_mainFragment)
        }
    }

}