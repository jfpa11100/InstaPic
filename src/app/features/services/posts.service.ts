import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private supabase: SupabaseClient | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.supabase = createClient(
        environment.supabaseConfig.url,
        environment.supabaseConfig.apikey
      );
    }
  }

  async uploadFile(file:File, fileName:string, bucketName:string, folderName:string = 'base'){
    const { error } = await this.supabase!.storage.from(bucketName).upload(`${folderName}/${fileName}`, file);
    if(error){
      console.log(error)
      throw error;
    }
    const { data } = this.supabase!.storage.from(bucketName).getPublicUrl(`${folderName}/${fileName}`)
    return data.publicUrl;
  }

  async deletePhoto(id: string, bucketName:string, folderName = 'base') {
    console.log("id ", id)
    console.log("folder ", folderName)
    const {data, error} = await this.supabase!
      .storage
      .from(bucketName)
      .remove([`${folderName}/${id}`])
    if (error){
      console.error(error)
    }
    console.log(data)
    return data
  }

}