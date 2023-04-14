package com.nifs.backend.controller.library;

import com.nifs.backend.config.JwtService;
import com.nifs.backend.constant.RequestStatus;
import com.nifs.backend.dto.library.ArticleRequestDTO;
import com.nifs.backend.serviceImplementation.library.ArticleRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/library/article-request")
public class ArticleRequestController {


    final
    ArticleRequestService articleRequestService;

    final
    JwtService jwtService;

    public ArticleRequestController(ArticleRequestService articleRequestService, JwtService jwtService) {
        this.articleRequestService = articleRequestService;
        this.jwtService = jwtService;
    }


    @PostMapping("/add")
    public ResponseEntity<?> createNewArticleRequest(@RequestBody ArticleRequestDTO data){
        return ResponseEntity.ok(articleRequestService.createNewArticleRequest(data));
    }

    @GetMapping
    public ResponseEntity<?> getAllArticleRequests(@RequestParam(required = false) String division){
        return ResponseEntity.ok(articleRequestService.getAllArticleRequests(division));
    }

    @PutMapping("/hod/status")
    public ResponseEntity<?> putHodApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(articleRequestService.putHodApproval(approval,resId,user));
    }

    @PutMapping("/director/status")
    public ResponseEntity<?> putDirectorApproval(@RequestParam RequestStatus approval, @RequestBody List<String> resId, @AuthenticationPrincipal UserDetails userDetails){
        String user = userDetails.getUsername();
        return ResponseEntity.ok(articleRequestService.putDirectorApproval(approval, resId, user));
    }

//    @GetMapping
//    public ResponseEntity<?> getAllArticleRequest(){
//
//        Map<String, Object> map = new LinkedHashMap<String, Object>();
//
//        try{
//
//            List<ArticleRequestDTO> data = articleRequestService.getAllArticleRequests();
//
//            if(!data.isEmpty()){
//                //return success code Response code
//                map.put("status", RequestStatus.SUCCESS);
//                map.put("code",201);
//                map.put("count",data.size());
//                map.put("data",data);
//                return new ResponseEntity<>(map, HttpStatus.OK);
//
//
//            }
//
//            // return Error Response code
//            map.put("status",RequestStatus.ERROR);
//            map.put("code",404);
//            map.put("message","Article data is not found. Please try again");
//            return new ResponseEntity<>(map,HttpStatus.OK);
//
//        }catch(Exception e){
//
//            // return the exception response code
//            System.out.println(e.toString());
//            map.put("status",RequestStatus.ERROR);
//            map.put("code",400);
//            map.put("error",e.toString());
//            map.put("message","Internal server error. Please try again!");
//            return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
//        }
//
//    }


}
